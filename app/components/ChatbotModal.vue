<template>
  <div class="chatbot-root">
    <!-- Botão Flutuante de Abertura do Chatbot -->
    <button
      v-if="!isChatOpen"
      type="button"
      class="chatbot-fab"
      aria-label="Abrir chat de atendimento Ivini.dev"
      @click="openChatbot()"
    >
      <span class="chatbot-fab-pulse" aria-hidden="true"></span>
      <svg class="chatbot-fab-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
      <span class="chatbot-fab-label">Fale Comigo</span>
    </button>

    <!-- Overlay & Janela do Chatbot (Evolution API) -->
    <Transition name="chatbot-fade">
      <div
        v-if="isChatOpen"
        class="chatbot-backdrop"
        @click.self="closeChatbot()"
      >
        <section
          class="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
        >
          <!-- Cabeçalho do Chatbot -->
          <header class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">
                <img src="/empresa.png" alt="Logo Ivini.dev" width="24" height="18" />
                <span class="chatbot-online-dot" aria-hidden="true"></span>
              </div>
              <div>
                <h2 id="chatbot-title" class="chatbot-title">Ivini<span>.Dev</span> • Chat Técnico</h2>
                <p class="chatbot-subtitle">
                  <span class="chatbot-status-indicator" aria-hidden="true"></span>
                  Online • Integrado via Evolution API
                </p>
              </div>
            </div>

            <div class="chatbot-header-actions">
              <button
                type="button"
                class="chatbot-icon-btn"
                title="Reiniciar conversa"
                aria-label="Reiniciar conversa"
                @click="resetChat()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" width="18" height="18">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button
                type="button"
                class="chatbot-icon-btn"
                title="Fechar chat"
                aria-label="Fechar chat"
                @click="closeChatbot()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <!-- Corpo de Mensagens -->
          <div ref="messagesContainerRef" class="chatbot-messages">
            <div class="chatbot-encryption-badge">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" width="14" height="14" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Conexão direta com o WhatsApp de Johnatan Ivini via Evolution API</span>
            </div>

            <div
              v-for="msg in messages"
              :key="msg.id"
              class="chatbot-msg-row"
              :class="msg.sender === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'"
            >
              <div class="chatbot-bubble">
                <p class="chatbot-bubble-text" v-html="msg.html"></p>

                <!-- Card de Ação Direta caso concluído -->
                <div v-if="msg.actionUrl" class="chatbot-action-card">
                  <a
                    :href="msg.actionUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-cta chatbot-whatsapp-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="17" height="17" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span>Abrir Conversa no WhatsApp</span>
                  </a>
                </div>

                <span class="chatbot-time">{{ msg.time }}</span>
              </div>
            </div>

            <!-- Indicador "Digitando..." -->
            <div v-if="isTyping" class="chatbot-msg-row chatbot-msg-bot">
              <div class="chatbot-bubble chatbot-typing-bubble" aria-label="Assistente digitando">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>

            <!-- Chips Rápidos da Etapa Atual -->
            <div v-if="!isTyping && currentQuickReplies.length > 0" class="chatbot-quick-replies">
              <button
                v-for="chip in currentQuickReplies"
                :key="chip"
                type="button"
                class="chatbot-chip"
                @click="handleQuickReply(chip)"
              >
                {{ chip }}
              </button>
            </div>
          </div>

          <!-- Rodapé / Input de Mensagem -->
          <form class="chatbot-input-bar" @submit.prevent="handleSubmit()">
            <input
              ref="inputRef"
              v-model="inputValue"
              :type="step === 'phone' ? 'tel' : 'text'"
              :placeholder="inputPlaceholder"
              :disabled="isTyping || isSending"
              class="chatbot-input"
              autocomplete="off"
              @input="handleInputFormat"
            />
            <button
              type="submit"
              class="chatbot-send-btn"
              :disabled="!inputValue.trim() || isTyping || isSending"
              aria-label="Enviar mensagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="19" height="19" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </section>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useChatbot } from '~/composables/useChatbot'

const {
  isChatOpen,
  preselectedTopic,
  openChatbot,
  closeChatbot,
  dispatchLeadToEvolution,
  sendFollowUpToEvolution
} = useChatbot()

const messagesContainerRef = ref(null)
const inputRef = ref(null)
const inputValue = ref('')
const isTyping = ref(false)
const isSending = ref(false)
const step = ref('topic') // 'topic' | 'name' | 'phone' | 'details' | 'completed'

const leadData = ref({
  topic: '',
  name: '',
  phone: '',
  details: ''
})

const messages = ref([])

const topicChips = [
  'Aplicações Web, SaaS & APIs (Laravel / Vue)',
  'Sustentação & Migração de Legado (PHP)',
  'Automação, Bots WhatsApp & IA',
  'Otimização & Segurança WordPress',
  'Consultoria / Outro Projeto'
]

const detailChips = [
  'Urgente — Preciso iniciar o quanto antes',
  'Já tenho escopo e busco orçamento',
  'Quero agendar uma call de diagnóstico técnico'
]

const currentQuickReplies = computed(() => {
  if (step.value === 'topic') return topicChips
  if (step.value === 'details') return detailChips
  return []
})

const inputPlaceholder = computed(() => {
  switch (step.value) {
    case 'topic':
      return 'Escolha uma opção acima ou digite sua necessidade...'
    case 'name':
      return 'Digite seu nome (e empresa, se desejar)...'
    case 'phone':
      return '(85) 99999-9999 (Seu WhatsApp com DDD)'
    case 'details':
      return 'Descreva brevemente o escopo ou objetivo...'
    default:
      return 'Envie uma mensagem complementar...'
  }
})

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function scrollToBottom() {
  nextTick(() => {
    const el = messagesContainerRef.value
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  })
}

function addMessage(sender, html, actionUrl = '') {
  messages.value.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sender,
    html,
    actionUrl,
    time: getCurrentTime()
  })
  scrollToBottom()
}

async function botReply(html, delay = 520, actionUrl = '') {
  isTyping.value = true
  scrollToBottom()
  await new Promise((resolve) => setTimeout(resolve, delay))
  isTyping.value = false
  addMessage('bot', html, actionUrl)
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function formatPhoneMask(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function handleInputFormat(e) {
  if (step.value === 'phone') {
    inputValue.value = formatPhoneMask(e.target.value)
  }
}

function buildFallbackWhatsAppUrl() {
  const text = [
    `Olá Ivini! Iniciei atendimento pelo Chatbot do site:`,
    ``,
    `*Nome:* ${leadData.value.name}`,
    `*WhatsApp:* ${leadData.value.phone}`,
    `*Interesse:* ${leadData.value.topic}`,
    `*Detalhes:* ${leadData.value.details}`
  ].join('\n')
  return `https://wa.me/5585991179809?text=${encodeURIComponent(text)}`
}

async function initConversation() {
  messages.value = []
  step.value = 'topic'
  leadData.value = { topic: '', name: '', phone: '', details: '' }
  inputValue.value = ''

  addMessage(
    'bot',
    'Olá! Sou o assistente técnico da <strong>Ivini.dev</strong>, integrado ao WhatsApp do <strong>Johnatan Ivini</strong> via <strong>Evolution API</strong>.'
  )

  if (preselectedTopic.value) {
    const chosen = preselectedTopic.value
    preselectedTopic.value = ''
    await handleQuickReply(chosen)
    return
  }

  await botReply(
    'Qual tipo de solução ou desafio técnico você busca hoje? Selecione um tema abaixo ou digite sua mensagem:',
    380
  )
}

function resetChat() {
  initConversation()
}

function handleQuickReply(chipText) {
  inputValue.value = chipText
  handleSubmit()
}

async function handleSubmit() {
  const raw = inputValue.value.trim()
  if (!raw || isTyping.value || isSending.value) return

  inputValue.value = ''
  addMessage('user', escapeHtml(raw))

  if (step.value === 'topic') {
    leadData.value.topic = raw
    step.value = 'name'
    await botReply(
      `Excelente escolha! Para eu registrar seu atendimento sobre <strong>${escapeHtml(raw)}</strong>, como posso te chamar?`
    )
    return
  }

  if (step.value === 'name') {
    leadData.value.name = raw
    step.value = 'phone'
    await botReply(
      `Muito prazer, <strong>${escapeHtml(raw)}</strong>! Qual é o seu <strong>WhatsApp com DDD</strong> para conectarmos a conversa direto no seu aparelho via Evolution API?`
    )
    return
  }

  if (step.value === 'phone') {
    const digits = raw.replace(/\D/g, '')
    if (digits.length < 10) {
      await botReply(
        'Por favor, informe um número de WhatsApp válido com DDD (ex.: <strong>(85) 99117-9809</strong>).'
      )
      return
    }
    leadData.value.phone = formatPhoneMask(digits)
    step.value = 'details'
    await botReply(
      'Perfeito! Conte brevemente sobre o <strong>escopo, objetivo ou urgência</strong> da sua demanda (ou selecione uma opção rápida):'
    )
    return
  }

  if (step.value === 'details') {
    leadData.value.details = raw
    step.value = 'completed'
    isSending.value = true
    isTyping.value = true
    scrollToBottom()

    const result = await dispatchLeadToEvolution({
      name: leadData.value.name,
      phone: leadData.value.phone,
      topic: leadData.value.topic,
      details: leadData.value.details
    })

    isTyping.value = false
    isSending.value = false

    const waUrl = buildFallbackWhatsAppUrl()

    if (result.sentViaApi) {
      addMessage(
        'bot',
        `Tudo pronto, <strong>${escapeHtml(leadData.value.name)}</strong>! Acabei de disparar seu briefing via <strong>Evolution API</strong> para o WhatsApp do <strong>Johnatan Ivini</strong> e enviei uma confirmação para <strong>${escapeHtml(leadData.value.phone)}</strong>.<br><br>Se desejar, você também pode abrir a conversa direta clicando abaixo ou continuar enviando detalhes por aqui:`,
        waUrl
      )
    } else {
      addMessage(
        'bot',
        `Perfeito, <strong>${escapeHtml(leadData.value.name)}</strong>! Seu briefing técnico sobre <strong>${escapeHtml(leadData.value.topic)}</strong> foi estruturado.<br><br>Clique no botão abaixo para sincronizar e continuar o atendimento imediatamente no WhatsApp do <strong>Johnatan Ivini</strong>:`,
        waUrl
      )
    }
    return
  }

  if (step.value === 'completed') {
    isSending.value = true
    const res = await sendFollowUpToEvolution({
      name: leadData.value.name,
      phone: leadData.value.phone,
      text: raw
    })
    isSending.value = false

    const waUrl = buildFallbackWhatsAppUrl()
    if (res.sentViaApi) {
      await botReply(
        'Mensagem complementar encaminhada via <strong>Evolution API</strong> para o WhatsApp do especialista!',
        400
      )
    } else {
      await botReply(
        'Mensagem anotada! Você pode enviar diretamente no WhatsApp clicando abaixo:',
        400,
        waUrl
      )
    }
  }
}

watch(isChatOpen, (open) => {
  if (open && messages.value.length === 0) {
    initConversation()
  } else if (open) {
    nextTick(() => inputRef.value?.focus())
  }
})

function handleKeydown(e) {
  if (e.key === 'Escape' && isChatOpen.value) {
    closeChatbot()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
