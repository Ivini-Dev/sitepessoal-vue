import { ref } from 'vue'

const isChatOpen = ref(false)
const preselectedTopic = ref('')
const LOCAL_STORAGE_KEY = 'ivini_captured_leads_txt'

export function useChatbot() {
  const config = useRuntimeConfig()

  function openChatbot(topic = '') {
    if (topic && typeof topic === 'string') {
      preselectedTopic.value = topic
    }
    isChatOpen.value = true
  }

  function closeChatbot() {
    isChatOpen.value = false
  }

  function cleanPhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '')
    if (!digits) return ''
    if (digits.startsWith('55') && digits.length >= 12) {
      return digits
    }
    return `55${digits}`
  }

  function sanitizeTxtField(val) {
    return String(val ?? '')
      .replace(/[\r\n|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  function formatLeadTxtLine({ id, timestamp, name, phone, email, topic, details, source }) {
    const safeName = sanitizeTxtField(name)
    const safePhone = sanitizeTxtField(phone)
    const safeEmail = sanitizeTxtField(email) || '-'
    const safeTopic = sanitizeTxtField(topic) || 'Consultoria / Geral'
    const safeDetails = sanitizeTxtField(details) || '-'
    const safeSource = sanitizeTxtField(source || 'https://ivini.dev')

    return `${timestamp} | ID: ${id} | Nome: ${safeName} | WhatsApp: ${safePhone} | Email: ${safeEmail} | Interesse: ${safeTopic} | Escopo: ${safeDetails} | Origem: ${safeSource}`
  }

  /**
   * Salva o lead capturado no arquivo leads.txt no backend de clientes.ivini.dev,
   * na rota Nitro local (/api/leads) e em cache local de segurança.
   */
  async function saveCapturedLead({ name, phone, email = '', topic, details }) {
    const now = new Date()
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)
    const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    const visitorPhone = cleanPhone(phone)
    const payload = {
      id,
      name: sanitizeTxtField(name),
      phone: visitorPhone ? `+${visitorPhone}` : sanitizeTxtField(phone),
      email: sanitizeTxtField(email),
      topic: sanitizeTxtField(topic),
      details: sanitizeTxtField(details),
      source: typeof window !== 'undefined' ? window.location.origin : 'https://ivini.dev'
    }

    const txtLine = formatLeadTxtLine({
      id,
      timestamp,
      ...payload
    })

    // 1. Backup local imediato (localStorage)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existing = window.localStorage.getItem(LOCAL_STORAGE_KEY) || ''
        const updated = existing ? `${existing}\n${txtLine}` : txtLine
        window.localStorage.setItem(LOCAL_STORAGE_KEY, updated)
      } catch (_) {
        // ignore storage quota errors
      }
    }

    const remoteUrl = String(config.public?.leadsApiUrl || 'https://cliente.ivini.dev/api/leads').trim()
    let savedRemotely = false
    let savedLocally = false

    // 2. Envia diretamente para cliente.ivini.dev/api/leads (produção e local)
    if (remoteUrl) {
      try {
        const res = await fetch(remoteUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        })
        savedRemotely = res.ok
      } catch (_) {
        savedRemotely = false
      }
    }

    // 3. Envia também para a rota local (/api/leads) quando disponível
    try {
      const localRes = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })
      savedLocally = localRes.ok
    } catch (_) {
      savedLocally = false
    }

    return {
      id,
      txtLine,
      savedRemotely,
      savedLocally
    }
  }

  async function sendPresence(baseUrl, instance, apiKey, number) {
    try {
      await fetch(`${baseUrl}/chat/sendPresence/${encodeURIComponent(instance)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey
        },
        body: JSON.stringify({
          number,
          delay: 1500,
          presence: 'composing'
        })
      })
    } catch (_) {
      // Ignora erro de presença silenciosamente
    }
  }

  async function sendText(baseUrl, instance, apiKey, number, text) {
    const response = await fetch(`${baseUrl}/message/sendText/${encodeURIComponent(instance)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey
      },
      body: JSON.stringify({
        number,
        text,
        linkPreview: true
      })
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      throw new Error(`Evolution API HTTP ${response.status}: ${errBody}`)
    }

    return await response.json().catch(() => ({ ok: true }))
  }

  /**
   * Salva o lead no arquivo .txt (clientes.ivini.dev + local) e dispara o resumo
   * para o WhatsApp do especialista e do visitante via Evolution API.
   */
  async function dispatchLeadToEvolution({ name, phone, email = '', topic, details }) {
    // Grava o lead em arquivo .txt para uso no clientes.ivini.dev
    const leadRecord = await saveCapturedLead({ name, phone, email, topic, details })

    const evoConfig = config.public?.evolution || {}
    const baseUrl = String(evoConfig.apiUrl || 'https://bot.buxin.com.br').replace(/\/+$/, '')
    const instance = String(evoConfig.instance || 'IviniLeadsBots').trim()
    const apiKey = String(evoConfig.apiKey || '').trim()
    const adminPhone = cleanPhone(evoConfig.adminPhone || '5585991179809')
    const visitorPhone = cleanPhone(phone)

    const adminMessage = [
      '🚀 *Novo Lead Capturado — Ivini.dev*',
      '',
      `👤 *Nome:* ${name}`,
      `📱 *WhatsApp:* +${visitorPhone}`,
      email ? `✉️ *E-mail:* ${email}` : null,
      `🎯 *Interesse:* ${topic}`,
      `📝 *Escopo / Detalhes:* ${details}`,
      '',
      '📂 *Salvo em:* leads.txt (pronto para orçamento em clientes.ivini.dev)'
    ]
      .filter((line) => line !== null)
      .join('\n')

    const visitorMessage = [
      `Olá, *${name}*! 👋`,
      '',
      `Recebemos seu contato pelo chatbot da *Ivini.dev* sobre *${topic}*.`,
      `📝 *Resumo enviado:* "${details}"`,
      '',
      'O *Johnatan Ivini* já recebeu seu briefing técnico e enviará sua proposta/orçamento em instantes!'
    ].join('\n')

    if (!baseUrl || !instance || !apiKey) {
      return {
        sentViaApi: false,
        reason: 'missing_credentials',
        adminPhone,
        visitorPhone,
        leadRecord
      }
    }

    try {
      await sendPresence(baseUrl, instance, apiKey, adminPhone)
      await sendText(baseUrl, instance, apiKey, adminPhone, adminMessage)

      if (visitorPhone && visitorPhone.length >= 12) {
        await sendPresence(baseUrl, instance, apiKey, visitorPhone)
        await sendText(baseUrl, instance, apiKey, visitorPhone, visitorMessage)
      }

      return {
        sentViaApi: true,
        adminPhone,
        visitorPhone,
        leadRecord
      }
    } catch (error) {
      return {
        sentViaApi: false,
        reason: error?.message || 'request_failed',
        adminPhone,
        visitorPhone,
        leadRecord
      }
    }
  }

  /**
   * Envia mensagem complementar em tempo real após o briefing inicial
   */
  async function sendFollowUpToEvolution({ name, phone, text }) {
    const evoConfig = config.public?.evolution || {}
    const baseUrl = String(evoConfig.apiUrl || 'https://bot.buxin.com.br').replace(/\/+$/, '')
    const instance = String(evoConfig.instance || 'IviniLeadsBots').trim()
    const apiKey = String(evoConfig.apiKey || '').trim()
    const adminPhone = cleanPhone(evoConfig.adminPhone || '5585991179809')
    const visitorPhone = cleanPhone(phone)

    if (!baseUrl || !instance || !apiKey) {
      return { sentViaApi: false }
    }

    try {
      const followUpMsg = `💬 *Mensagem complementar de ${name}* (+${visitorPhone}):\n${text}`
      await sendText(baseUrl, instance, apiKey, adminPhone, followUpMsg)
      return { sentViaApi: true }
    } catch (_) {
      return { sentViaApi: false }
    }
  }

  return {
    isChatOpen,
    preselectedTopic,
    openChatbot,
    closeChatbot,
    cleanPhone,
    saveCapturedLead,
    dispatchLeadToEvolution,
    sendFollowUpToEvolution
  }
}
