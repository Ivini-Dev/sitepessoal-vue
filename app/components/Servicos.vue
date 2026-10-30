<template>
  <section id="servicos" class="section" aria-labelledby="servicos-heading">
    <div class="section-title">
      <span class="section-badge">// EXPERTISE TÉCNICA</span>
      <h2 id="servicos-heading">Soluções Corporativas & Serviços de Engenharia</h2>
      <p>Do desenvolvimento de plataformas SaaS do zero à sustentação crítica, automação com IA e migração de ambientes legados complexos sem downtime.</p>
    </div>
    
    <div class="grid-cards">
      <!-- Card 1 -->
      <div class="card card-animated" style="--card-index: 1;">
        <div class="card-glow-accent"></div>
        <div class="card-header-wrapper">
          <div class="card-icon-wrapper" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-svg">
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
              <line x1="6" x2="6.01" y1="6" y2="6"/>
              <line x1="6" x2="6.01" y1="18" y2="18"/>
              <path d="M12 6h4"/>
              <path d="M12 18h4"/>
            </svg>
          </div>
          <span class="card-number">01</span>
        </div>
        <h3>Migração & Sustentação de Legados</h3>
        <p>Evolução segura e manutenção especializada de aplicações críticas em PHP 5.x/7.x até PHP 8+ e Laravel moderno, eliminando dívidas técnicas, gargalos de banco de dados e garantindo alta disponibilidade sem interrupção operacional.</p>
        <div class="tech-tags">
          <span class="tag">PHP 5+ / 8</span>
          <span class="tag">Refatoração</span>
          <span class="tag">Legados</span>
          <span class="tag">Zero Downtime</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card card-animated" style="--card-index: 2;">
        <div class="card-glow-accent"></div>
        <div class="card-header-wrapper">
          <div class="card-icon-wrapper" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-svg">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
              <line x1="12" x2="12" y1="2" y2="22" transform="rotate(15 12 12)"/>
            </svg>
          </div>
          <span class="card-number">02</span>
        </div>
        <h3>Aplicações Web, SaaS & APIs</h3>
        <p>Desenvolvimento de sistemas corporativos sob medida, plataformas SaaS multi-tenant, microsserviços e painéis administrativos utilizando arquitetura limpa (Clean Code), integrações de pagamento (PIX/Stripe) e segurança rigorosa.</p>
        <div class="tech-tags">
          <span class="tag">Laravel</span>
          <span class="tag">Vue.js / Nuxt</span>
          <span class="tag">REST APIs</span>
          <span class="tag">MySQL & Redis</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card card-animated" style="--card-index: 3;">
        <div class="card-glow-accent"></div>
        <div class="card-header-wrapper">
          <div class="card-icon-wrapper" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span class="card-number">03</span>
        </div>
        <h3>Otimização & Segurança WordPress</h3>
        <p>Aceleração de tempo de resposta e Core Web Vitals, correções profundas em ecossistemas WordPress, auditoria contra vulnerabilidades (hardening) e suporte técnico contínuo para sites corporativos de alto tráfego.</p>
        <div class="tech-tags">
          <span class="tag">WordPress</span>
          <span class="tag">Hardening</span>
          <span class="tag">Speed Up</span>
          <span class="tag">SEO Técnico</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

