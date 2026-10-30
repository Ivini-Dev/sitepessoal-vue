<template>
  <section id="contato" class="section" style="text-align: center; max-width: 860px;" aria-labelledby="contato-heading">
    <div class="section-title">
      <h2 id="contato-heading">Precisa de uma solução sob medida?</h2>
      <p>Vamos conversar sobre a arquitetura do seu próximo SaaS, modernização de sistemas legados em PHP/Laravel, automações com IA ou sustentação corporativa contínua.</p>
    </div>
    <div class="contact-actions">
      <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-cta" style="padding: 1rem 2.5rem; font-size: 1.1rem;">Entrar em Contato via WhatsApp</a>
    </div>
    <div class="contact-links" aria-label="Canais oficiais e redes profissionais">
      <a href="https://github.com/johnatanivini" target="_blank" rel="noopener noreferrer" class="contact-channel-link">GitHub (@johnatanivini) ↗</a>
      <span class="trust-divider" aria-hidden="true">•</span>
      <a href="https://www.linkedin.com/in/johnatanivini" target="_blank" rel="noopener noreferrer" class="contact-channel-link">LinkedIn (Johnatan Ivini) ↗</a>
      <span class="trust-divider" aria-hidden="true">•</span>
      <a href="https://clientes.ivini.dev" target="_blank" rel="noopener noreferrer" class="contact-channel-link">Portal de Clientes ↗</a>
    </div>
  </section>
</template>

<script setup>
const whatsappUrl = 'https://wa.me/5585991179809?text=Ol%C3%A1%20Ivini!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.'
</script>
