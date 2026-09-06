<template>
  <section id="projetos" class="section">
    <div class="section-title">
      <h2>Projetos & Cases em Destaque</h2>
      <p>Soluções corporativas, plataformas e ecossistemas SaaS desenvolvidos com foco em performance e escala.</p>
    </div>

    <div class="grid-projects">
      <!-- Card Ajeita Cursos -->
      <article class="project-card">
        <div class="project-img-wrapper">
          <img 
            src="/images/ajeita-cursos.png" 
            alt="Ajeita Cursos - Plataforma de Cursos Online" 
            class="project-img" 
            loading="lazy"
          />
        </div>
        <div class="project-content">
          <h3>Ajeita Cursos</h3>
          <p>Plataforma SaaS full-stack que converte PDFs e temas em cursos estruturados usando inteligência artificial (Google Gemini e Grok)</p>
          <div class="tech-tags" style="margin-bottom: 1.5rem;">
            <span class="tag">Vue.js</span>
            <span class="tag">TailwindCSS</span>
            <span class="tag">PHP / Laravel</span>
            <span class="tag">Google Cloud</span>
            <span class="tag">MySQL</span>
            <span class="tag">Docker</span>
            <span class="tag">Rest Api</span>
            <span class="tag">Api Stripe</span>
          </div>
          <div class="project-footer">
            <a 
              href="https://ajeitacursos.com.br/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-cta" 
              style="padding: 0.5rem 1.2rem; font-size: 0.85rem;"
            >
              Visitar Projeto ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Card Buxin -->
      <article class="project-card">
        <div class="project-img-wrapper">
          <img 
            src="/images/buxin.png" 
            alt="Buxin - Plataforma de Delivery e Pedidos" 
            class="project-img" 
            loading="lazy"
          />
        </div>
        <div class="project-content">
          <h3>Buxin</h3>
          <p>Plataforma SaaS White Label para gestão de delivery e automação de pedidos para restaurantes, oferecendo acompanhamento em tempo real, painel financeiro e alta escala.</p>
          <div class="tech-tags" style="margin-bottom: 1.5rem;">
            <span class="tag">PHP / Laravel</span>
            <span class="tag">Vue.js</span>
            <span class="tag">TailwindCSS</span>
            <span class="tag">Webhooks</span>
            <span class="tag">Docker</span>
            <span class="tag">Api Stripe</span>
            <span class="tag">Cloud</span>
          </div>
          <div class="project-footer">
            <a 
              href="https://buxin.com.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-cta" 
              style="padding: 0.5rem 1.2rem; font-size: 0.85rem;"
            >
              Visitar Projeto ↗
            </a>
          </div>
        </div>
      </article>

      <!-- Card Ivini LeadBot -->
      <article class="project-card">
        <div class="project-img-wrapper">
          <img 
            src="/images/leads.png" 
            alt="Ivini LeadBot - Sistema Inteligente de Prospecção e Automação de Vendas" 
            class="project-img" 
            loading="lazy"
          />
        </div>
        <div class="project-content">
          <h3>Ivini LeadBot</h3>
          <p>Plataforma de prospecção automatizada que une web scraping no Google Maps, geração de landing pages via IA (Ollama) e automação de pré-venda via WhatsApp (Evolution API / Groq) para comerciantes locais.</p>
          <div class="tech-tags" style="margin-bottom: 1.5rem;">
            <span class="tag">PHP / Laravel</span>
            <span class="tag">Nuxt.js</span>
            <span class="tag">Tailwind CSS</span>
            <span class="tag">Web Scraping</span>
            <span class="tag">Ollama</span>
            <span class="tag">Groq / Llama 3</span>
            <span class="tag">Evolution API</span>
          </div>
          <div class="project-footer">
            <a 
              href="https://ivini-leads-bots.ivini.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-cta" 
              style="padding: 0.5rem 1.2rem; font-size: 0.85rem;"
            >
              Visitar Projeto ↗
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
</script>
