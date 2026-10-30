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
const step = ref('topic') // 'topic' | 'name' | 'phone' | 'email' | 'details' | 'completed'

const HOSTINGER_URL = 'https://www.hostinger.com/br?REFERRALCODE=YBXJOHNATHQV'
const REGISTRO_BR_URL = 'https://registro.br/'

const emptyLead = () => ({
  topic: '',
  name: '',
  phone: '',
  email: '',
  company: '',
  about: '',
  colors: '',
  hosting: '',
  domain: '',
  details: ''
})

const leadData = ref(emptyLead())

const messages = ref([])

const topicChips = [
  'Aplicações Web, SaaS & APIs (Laravel / Vue)',
  'Sustentação & Migração de Legado (PHP)',
  'Automação, Bots WhatsApp & IA',
  'Otimização & Segurança WordPress',
  'Consultoria / Outro Projeto'
]

const emailChips = [
  'Prefiro receber orçamento apenas pelo WhatsApp'
]

const detailChips = [
  'Urgente — Preciso iniciar o quanto antes',
  'Já tenho escopo e busco orçamento',
  'Quero agendar uma call de diagnóstico técnico'
]

const colorChips = ['Ainda não tenho cores definidas', 'Quero sugestões baseadas no meu logo']
const hostingChips = ['Sim, já tenho hospedagem', 'Não tenho hospedagem']
const domainChips = ['Sim, já tenho domínio registrado', 'Não tenho domínio ainda']

const currentQuickReplies = computed(() => {
  if (step.value === 'topic') return topicChips
  if (step.value === 'email') return emailChips
  if (step.value === 'colors') return colorChips
  if (step.value === 'hosting') return hostingChips
  if (step.value === 'domain') return domainChips
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
    case 'email':
      return 'seu@email.com.br (opcional para envio de orçamento)'
    case 'company':
      return 'Nome da sua empresa ou marca...'
    case 'about':
      return 'Ex.: Clínica odontológica em Fortaleza, atendimento familiar...'
    case 'colors':
      return 'Ex.: Azul marinho e dourado, #0A2540...'
    case 'hosting':
      return 'Sim / Não (qual provedor?)'
    case 'domain':
      return 'Ex.: minhaempresa.com.br ou "não tenho"'
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
    leadData.value.email ? `*E-mail:* ${leadData.value.email}` : null,
    `*Interesse:* ${leadData.value.topic}`,
    leadData.value.company ? `*Empresa:* ${leadData.value.company}` : null,
    leadData.value.about ? `*Sobre:* ${leadData.value.about}` : null,
    leadData.value.colors ? `*Cores:* ${leadData.value.colors}` : null,
    leadData.value.hosting ? `*Hospedagem:* ${leadData.value.hosting}` : null,
    leadData.value.domain ? `*Domínio:* ${leadData.value.domain}` : null,
    `*Detalhes:* ${leadData.value.details}`
  ]
    .filter(Boolean)
    .join('\n')
  return `https://wa.me/5585991179809?text=${encodeURIComponent(text)}`
}

async function initConversation() {
  messages.value = []
  step.value = 'topic'
  leadData.value = emptyLead()
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
    step.value = 'email'
    await botReply(
      'Qual é o seu <strong>e-mail</strong> para enviarmos o link do orçamento e contrato pelo Portal de Clientes (ou clique abaixo para receber apenas no WhatsApp)?'
    )
    return
  }

  if (step.value === 'email') {
    const isSkip = raw.toLowerCase().includes('apenas pelo whatsapp') || raw.toLowerCase() === 'pular'
    leadData.value.email = isSkip ? '' : raw
    step.value = 'company'
    await botReply('Anotado! Qual é o <strong>nome da sua empresa</strong> ou marca?')
    return
  }

  if (step.value === 'company') {
    leadData.value.company = raw
    step.value = 'about'
    await botReply(
      `Legal! Faça um <strong>breve comentário sobre a ${escapeHtml(raw)}</strong>: o que faz, público-alvo e região de atuação.`
    )
    return
  }

  if (step.value === 'about') {
    leadData.value.about = raw
    step.value = 'colors'
    await botReply(
      'A empresa já possui <strong>cores predefinidas</strong> (identidade visual)? Informe as cores ou códigos HEX, ou escolha uma opção:'
    )
    return
  }

  if (step.value === 'colors') {
    leadData.value.colors = raw
    step.value = 'hosting'
    await botReply('Você já possui <strong>hospedagem</strong> contratada para o site/sistema?')
    return
  }

  if (step.value === 'hosting') {
    leadData.value.hosting = raw
    const noHosting = /^n(ã|a)o\b/i.test(raw) || /n(ã|a)o tenho/i.test(raw)
    if (noHosting) {
      await botReply(
        `Sem problemas! Recomendo a <strong>Hostinger</strong>. Pelo meu link você ganha <strong>20% de desconto</strong>:<br><a href="${HOSTINGER_URL}" target="_blank" rel="noopener sponsored" class="chatbot-link">👉 Contratar Hostinger com 20% OFF</a>`,
        450
      )
    }
    step.value = 'domain'
    await botReply(
      'E quanto ao <strong>domínio</strong>? Você já tem um domínio registrado no <strong>Registro.br</strong> (ex.: suaempresa.com.br)? Se sim, informe qual.',
      noHosting ? 700 : 520
    )
    return
  }

  if (step.value === 'domain') {
    leadData.value.domain = raw
    const noDomain = /^n(ã|a)o\b/i.test(raw) || /n(ã|a)o tenho/i.test(raw)
    if (noDomain) {
      await botReply(
        `Tranquilo! Domínios <strong>.com.br</strong> são registrados no <a href="${REGISTRO_BR_URL}" target="_blank" rel="noopener" class="chatbot-link">Registro.br</a> (cerca de R$ 40/ano). Posso te orientar no registro depois.`,
        450
      )
    }
    step.value = 'details'
    await botReply(
      'Perfeito! Por fim, conte brevemente sobre o <strong>escopo, objetivo ou urgência</strong> da sua demanda (ou selecione uma opção rápida):',
      noDomain ? 700 : 520
    )
    return
  }

  if (step.value === 'details') {
    leadData.value.details = raw
    step.value = 'completed'
    isSending.value = true
    isTyping.value = true
    scrollToBottom()

    const fullDetails = [
      `Empresa: ${leadData.value.company}`,
      `Sobre: ${leadData.value.about}`,
      `Cores: ${leadData.value.colors}`,
      `Hospedagem: ${leadData.value.hosting}`,
      `Domínio: ${leadData.value.domain}`,
      `Escopo: ${leadData.value.details}`
    ].join(' ; ')

    await dispatchLeadToEvolution({
      name: leadData.value.company ? `${leadData.value.name} (${leadData.value.company})` : leadData.value.name,
      phone: leadData.value.phone,
      email: leadData.value.email,
      topic: leadData.value.topic,
      details: fullDetails
    })

    isTyping.value = false
    isSending.value = false

    addMessage(
      'bot',
      `Tudo pronto, <strong>${escapeHtml(leadData.value.name)}</strong>! ✅<br><br>Seu briefing sobre <strong>${escapeHtml(leadData.value.topic)}</strong> foi registrado e enviado automaticamente via <strong>Evolution API</strong> para o <strong>Johnatan Ivini</strong>.<br><br>Você receberá o link do seu orçamento diretamente no WhatsApp (<strong>${escapeHtml(leadData.value.phone)}</strong>)${leadData.value.email ? ` e no e-mail <strong>${escapeHtml(leadData.value.email)}</strong>` : ''}. Se quiser acrescentar mais algum detalhe técnico, basta digitar aqui abaixo:`
    )
    return
  }

  if (step.value === 'completed') {
    isSending.value = true
    await sendFollowUpToEvolution({
      name: leadData.value.name,
      phone: leadData.value.phone,
      text: raw
    })
    isSending.value = false

    await botReply(
      'Mensagem complementar sincronizada automaticamente com o especialista via <strong>Evolution API</strong>!',
      400
    )
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
