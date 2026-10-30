<template>
  <header>
    <a href="#top" class="logo" aria-label="Ivini.dev - Ir para o topo">
      <img src="/empresa.png" alt="Logo Ivini.dev" width="28" height="21" decoding="async" />
      Ivini<span>.Dev</span>
    </a>
    <nav aria-label="Navegação principal">
      <a href="#servicos">Soluções</a>
      <a href="#projetos">Projetos</a>
      <a href="#sobre">Diferenciais</a>
      <a href="#stack">Tech Stack</a>
      <a href="#contato">Contato</a>
    </nav>
    <button type="button" class="btn-cta" @click="openChatbot()">Fale Comigo</button>
  </header>
</template>

<script setup>
import { useChatbot } from '~/composables/useChatbot'

const { openChatbot } = useChatbot()
</script>
