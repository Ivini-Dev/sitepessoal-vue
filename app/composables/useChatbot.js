import { ref } from 'vue'

const isChatOpen = ref(false)
const preselectedTopic = ref('')

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
   * Dispara o resumo do lead para o WhatsApp do especialista e a confirmação
   * automática para o WhatsApp do visitante usando a Evolution API.
   */
  async function dispatchLeadToEvolution({ name, phone, topic, details }) {
    const evoConfig = config.public?.evolution || {}
    const baseUrl = String(evoConfig.apiUrl || 'https://bot.buxin.com.br').replace(/\/+$/, '')
    const instance = String(evoConfig.instance || 'IviniLeadsBots').trim()
    const apiKey = String(evoConfig.apiKey || '').trim()
    const adminPhone = cleanPhone(evoConfig.adminPhone || '5585991179809')
    const visitorPhone = cleanPhone(phone)

    const adminMessage = [
      '🚀 *Novo Atendimento via Chatbot — Ivini.dev*',
      '',
      `👤 *Nome:* ${name}`,
      `📱 *WhatsApp:* +${visitorPhone}`,
      `🎯 *Interesse:* ${topic}`,
      `📝 *Escopo / Detalhes:* ${details}`,
      '',
      '🌐 *Origem:* https://ivini.dev'
    ].join('\n')

    const visitorMessage = [
      `Olá, *${name}*! 👋`,
      '',
      `Recebemos seu contato pelo chatbot da *Ivini.dev* sobre *${topic}*.`,
      `📝 *Resumo enviado:* "${details}"`,
      '',
      'O *Johnatan Ivini* já recebeu seu briefing técnico e dará sequência ao seu atendimento por aqui em instantes!'
    ].join('\n')

    if (!baseUrl || !instance || !apiKey) {
      return {
        sentViaApi: false,
        reason: 'missing_credentials',
        adminPhone,
        visitorPhone
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
        visitorPhone
      }
    } catch (error) {
      return {
        sentViaApi: false,
        reason: error?.message || 'request_failed',
        adminPhone,
        visitorPhone
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
    dispatchLeadToEvolution,
    sendFollowUpToEvolution
  }
}
