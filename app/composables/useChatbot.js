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
   * Salva o lead capturado no arquivo leads.txt no backend de cliente.ivini.dev
   * (que também dispara automaticamente via Evolution API) e na rota local quando em localhost.
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
    let whatsappStatus = { admin_sent: false, visitor_sent: false }

    // 2. Envia diretamente para https://cliente.ivini.dev/api/leads (grava em storage/app/leads.txt + dispara Evolution API no backend)
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
        if (res.ok) {
          const data = await res.json().catch(() => ({}))
          if (data?.whatsapp) {
            whatsappStatus = data.whatsapp
          }
        }
      } catch (_) {
        savedRemotely = false
      }
    }

    // 3. Apenas em ambiente de desenvolvimento local (localhost / 127.0.0.1), grava também no Nitro local (/api/leads)
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (isLocalhost) {
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
    }

    return {
      id,
      txtLine,
      savedRemotely,
      savedLocally,
      whatsappStatus
    }
  }

  /**
   * Salva o lead no arquivo .txt em https://cliente.ivini.dev/api/leads e dispara
   * automaticamente via Evolution API pelo backend (sem chamadas diretas do navegador para bot.buxin.com.br).
   */
  async function dispatchLeadToEvolution({ name, phone, email = '', topic, details }) {
    const leadRecord = await saveCapturedLead({ name, phone, email, topic, details })

    return {
      sentViaApi: Boolean(leadRecord.savedRemotely || leadRecord.savedLocally),
      leadRecord
    }
  }

  /**
   * Envia mensagem complementar em tempo real após o briefing inicial via backend cliente.ivini.dev
   */
  async function sendFollowUpToEvolution({ name, phone, text }) {
    const visitorPhone = cleanPhone(phone)
    const remoteFollowUpUrl =
      String(config.public?.leadsApiUrl || 'https://cliente.ivini.dev/api/leads')
        .trim()
        .replace(/\/+$/, '') + '/followup'

    try {
      const res = await fetch(remoteFollowUpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: sanitizeTxtField(name),
          phone: visitorPhone ? `+${visitorPhone}` : sanitizeTxtField(phone),
          text: sanitizeTxtField(text)
        })
      })
      return { sentViaApi: res.ok }
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
