<template>
  <section id="projetos" class="section">
    <div class="section-title">
      <h2>Projetos & Cases em Destaque</h2>
      <p>Soluções corporativas, plataformas e ecossistemas SaaS desenvolvidos com foco em performance e escala.</p>
    </div>

    <!-- Container oculto utilizado pelo LightGallery para abrir o modal de imagens -->
    <div ref="galleryRef" style="display: none;"></div>

    <div class="portfolio-swiper-wrapper">
      <Swiper
        :modules="[EffectCoverflow, Autoplay, Navigation, Pagination]"
        effect="coverflow"
        :grab-cursor="true"
        :centered-slides="true"
        :loop="true"
        :slides-per-view="'auto'"
        :coverflow-effect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        class="portfolio-swiper"
      >
        <SwiperSlide
          v-for="project in projects"
          :key="project.id"
          class="portfolio-swiper-slide"
        >
          <article class="project-card">
            <div
              class="project-img-wrapper project-single-thumb"
              role="button"
              tabindex="0"
              :aria-label="`Abrir galeria de imagens do projeto ${project.title}`"
              @click="openGallery(project, 0)"
              @keydown.enter.prevent="openGallery(project, 0)"
            >
              <img
                :src="project.images[0].src"
                :alt="project.images[0].alt"
                width="1280"
                height="800"
                class="project-img"
                loading="lazy"
                decoding="async"
              />
              <div class="zoom-overlay">
                <span class="zoom-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  Ver Galeria ({{ project.images.length }})
                </span>
              </div>
            </div>

            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="tech-tags" style="margin-bottom: 1.5rem;">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="project-footer">
                <a
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-cta"
                  style="padding: 0.5rem 1.2rem; font-size: 0.85rem;"
                >
                  Visitar Projeto ↗
                </a>
                <button
                  type="button"
                  class="btn-gallery-trigger"
                  @click="openGallery(project, 0)"
                >
                  Ver Galeria ({{ project.images.length }})
                </button>
              </div>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const projects = [
  {
    id: 'buxin',
    title: 'Buxin',
    description: 'Plataforma SaaS White Label para gestão de delivery e automação de pedidos para restaurantes e açaíterias, com acompanhamento Kanban em tempo real, cardápio digital customizável e painel financeiro.',
    url: 'https://web.buxin.com.br',
    tags: [
      'PHP / Laravel',
      'Vue.js / Nuxt.js',
      'TailwindCSS',
      'Webhooks',
      'Docker',
      'API Stripe & PIX',
      'Cloud'
    ],
    images: [
      {
        src: '/images/buxin-landing.webp',
        alt: 'Buxin - Plataforma SaaS de Delivery Sem Intermediários',
        subHtml: '<h4>Buxin - Landing Page SaaS</h4><p>Apresentação da plataforma e simulação interativa do Kanban de pedidos em tempo real.</p>'
      },
      {
        src: '/images/buxin.webp',
        alt: 'Buxin - Painel Kanban de Gestão de Pedidos',
        subHtml: '<h4>Buxin - Painel Kanban do Lojista</h4><p>Gestão de fila de preparo, despacho de pedidos e controle operacional em tempo real.</p>'
      },
      {
        src: '/images/buxin-whitelabel.webp',
        alt: 'Buxin - Personalização Whitelabel do Cardápio Digital',
        subHtml: '<h4>Buxin - Experiência Live Whitelabel</h4><p>Customização de cores, temas e adicionais do cardápio digital em tempo real.</p>'
      },
      {
        src: '/images/buxin-features.webp',
        alt: 'Buxin - Calculadora de Economia e Taxa Zero',
        subHtml: '<h4>Buxin - Calculadora de Economia</h4><p>Comparativo financeiro de economia anual frente aos marketplaces tradicionais.</p>'
      },
      {
        src: '/images/buxin-planos.webp',
        alt: 'Buxin - Planos e Assinaturas SaaS',
        subHtml: '<h4>Buxin - Planos & Preços</h4><p>Estrutura de planos multi-tenant com cobrança recorrente automatizada.</p>'
      }
    ]
  },
  {
    id: 'reforcy',
    title: 'Reforcy',
    description: 'Plataforma SaaS completa para tutores e professores particulares que centraliza gestão de alunos, agenda semanal, planejamento de aulas e exercícios com Inteligência Artificial, controle financeiro e cobranças via WhatsApp.',
    url: 'https://reforcy.com.br',
    tags: [
      'PHP / Laravel',
      'Nuxt.js',
      'TailwindCSS',
      'Inteligência Artificial',
      'Automação WhatsApp',
      'MySQL & Redis',
      'Docker'
    ],
    images: [
      {
        src: '/images/reforcy-dashboard.webp',
        alt: 'Reforcy - Painel Principal de Gestão de Alunos e Aulas',
        subHtml: '<h4>Reforcy - Dashboard do Professor</h4><p>Visão geral de aulas na semana, alunos ativos, receitas, cobranças e reposições.</p>'
      },
      {
        src: '/images/reforcy-planejamento-ia.webp',
        alt: 'Reforcy - Assistente de Planejamento e Exercícios com IA',
        subHtml: '<h4>Reforcy - Planejamento Pedagógico com IA</h4><p>Geração automática de roteiros de aula em 4 etapas e listas de exercícios contextualizadas com o histórico do aluno.</p>'
      },
      {
        src: '/images/reforcy-agenda.webp',
        alt: 'Reforcy - Agenda Semanal de Aulas e Presenças',
        subHtml: '<h4>Reforcy - Agenda & Controle de Presenças</h4><p>Gestão de horários, confirmação de aulas, links de videochamada e reposições.</p>'
      },
      {
        src: '/images/reforcy-financeiro.webp',
        alt: 'Reforcy - Visão Financeira e Fluxo de Caixa',
        subHtml: '<h4>Reforcy - Painel Financeiro</h4><p>Acompanhamento de valores esperados vs. recebidos e taxa de adimplência mensal.</p>'
      },
      {
        src: '/images/reforcy-diario.webp',
        alt: 'Reforcy - Diário de Classe e Evolução Pedagógica',
        subHtml: '<h4>Reforcy - Diário de Classe</h4><p>Registro detalhado do conteúdo trabalhado, evolução e observações pós-aula.</p>'
      },
      {
        src: '/images/reforcy-comunicacao.webp',
        alt: 'Reforcy - Central de Comunicação e Lembretes',
        subHtml: '<h4>Reforcy - Comunicação com Pais e Alunos</h4><p>Envio de relatórios de progresso, lembretes de aula e avisos integrados ao WhatsApp.</p>'
      }
    ]
  },
  {
    id: 'clientes-ivini',
    title: 'Portal de Clientes & Faturamento',
    description: 'Sistema corporativo de faturamento, homologação de entregas, assinatura de contratos digitais e checkout transparente (PIX e Cartão via Mercado Pago) com liberação automatizada para clientes.',
    url: 'https://clientes.ivini.dev',
    tags: [
      'PHP / Laravel',
      'Nuxt.js',
      'TailwindCSS',
      'API Mercado Pago',
      'Checkout Transparente',
      'Docker & Traefik',
      'MySQL'
    ],
    images: [
      {
        src: '/images/clientes-painel.webp',
        alt: 'Portal de Clientes Ivini.dev - Painel Administrativo de Faturas e Projetos',
        subHtml: '<h4>Portal Clientes Ivini.dev - Painel Administrativo</h4><p>Gerenciamento de clientes, status de faturas, anexos de notas fiscais, chat e entregas.</p>'
      },
      {
        src: '/images/clientes-fatura.webp',
        alt: 'Portal de Clientes Ivini.dev - Portal Público de Faturamento e Homologação',
        subHtml: '<h4>Portal de Homologação & Faturamento do Cliente</h4><p>Visualização do contrato assinado, evidências visuais de entrega, chat do projeto e pagamento flexível (Total ou 50/50).</p>'
      },
      {
        src: '/images/clientes-checkout.webp',
        alt: 'Portal de Clientes Ivini.dev - Checkout Transparente Cartão e PIX',
        subHtml: '<h4>Checkout Transparente Mercado Pago</h4><p>Pagamento integrado via Cartão de Crédito com tokenização PCI-DSS e PIX em tempo real.</p>'
      },
      {
        src: '/images/clientes-entregas.webp',
        alt: 'Portal de Clientes Ivini.dev - Gestão de Entregas e Evidências de Homologação',
        subHtml: '<h4>Gestão de Entregas & Marcos do Projeto</h4><p>Registro de sprints, links de homologação, prints e documentação para validação do cliente.</p>'
      },
      {
        src: '/images/clientes-contrato.webp',
        alt: 'Portal de Clientes Ivini.dev - Visualização de Contrato e Escopo Assinado',
        subHtml: '<h4>Contrato Digital & Escopo Homologado</h4><p>Consulta de cláusulas, termos técnicos de garantia e download do contrato em PDF.</p>'
      },
      {
        src: '/images/clientes-novo-projeto.webp',
        alt: 'Portal de Clientes Ivini.dev - Cadastro de Novo Cliente e Projeto',
        subHtml: '<h4>Cadastro de Projeto & Geração de Link de Fatura</h4><p>Configuração rápida de escopo, repositório GitHub, percentual de sinal e contrato PDF.</p>'
      }
    ]
  },
  {
    id: 'ivini-leadbot',
    title: 'Ivini LeadBot',
    description: 'Ecossistema B2B de prospecção automatizada com web scraping no Google Maps (Playwright), enriquecimento de dados, geração automática de Landing Pages com IA Híbrida (Ollama Local + Groq Cloud) e abordagem comercial via WhatsApp (Evolution API).',
    url: 'https://ivini-leads-bots.ivini.dev',
    tags: [
      'PHP / Laravel',
      'Nuxt.js',
      'Python / Playwright',
      'IA Híbrida (Ollama & Groq)',
      'Evolution API (WhatsApp)',
      'Redis & Queues',
      'Docker'
    ],
    images: [
      {
        src: '/images/leads.webp',
        alt: 'Ivini LeadBot - Dashboard de Campanhas de Prospecção',
        subHtml: '<h4>Ivini LeadBot - Relatório de Campanhas</h4><p>Controle em tempo real de campanhas de extração no Google Maps e métricas de leads qualificados.</p>'
      },
      {
        src: '/images/leads-campanha-detalhes.webp',
        alt: 'Ivini LeadBot - Pipeline de Envios e Geração de Landing Pages com IA',
        subHtml: '<h4>Pipeline de Envios & Geração de Sites</h4><p>Gestão de leads capturados com ações de geração de Landing Page via IA, edição de código HTML e disparo em lote no WhatsApp.</p>'
      },
      {
        src: '/images/leads-dados-ia.webp',
        alt: 'Ivini LeadBot - Dados Brutos e Contexto Extraído pelo Robô no Google Maps',
        subHtml: '<h4>Enriquecimento de Dados & Contexto IA</h4><p>Inspeção do JSON estruturado com avaliações, endereço, telefone e contexto extraído automaticamente do Google Maps.</p>'
      },
      {
        src: '/images/leads-nova-campanha.webp',
        alt: 'Ivini LeadBot - Configuração de Nova Campanha de Varredura',
        subHtml: '<h4>Nova Campanha de Busca Automatizada</h4><p>Definição de nicho, termo de pesquisa e região geográfica para varredura assíncrona via Playwright.</p>'
      },
      {
        src: '/images/leads-relatorio.webp',
        alt: 'Ivini LeadBot - Catálogo e Filtros de Leads Qualificados',
        subHtml: '<h4>Catálogo de Leads Extraídos</h4><p>Filtragem avançada por categoria, avaliação mínima e presença digital.</p>'
      }
    ]
  },
  {
    id: 'ajeita-cursos',
    title: 'Ajeita Cursos',
    description: 'Plataforma SaaS full-stack que converte PDFs e temas em cursos estruturados usando inteligência artificial (Google Gemini e Grok).',
    url: 'https://ajeitacursos.com.br/',
    tags: [
      'Vue.js',
      'TailwindCSS',
      'PHP / Laravel',
      'Google Cloud',
      'MySQL',
      'Docker',
      'Rest Api',
      'Api Stripe'
    ],
    images: [
      {
        src: '/images/ajeita-cursos.webp',
        alt: 'Ajeita Cursos - Plataforma de Cursos Online Gerados por IA',
        subHtml: '<h4>Ajeita Cursos - Gerador de Cursos com IA</h4><p>Estruturação automática de módulos, aulas e quizzes interativos a partir de temas ou documentos PDF.</p>'
      }
    ]
  }
]

const galleryRef = ref(null)
let lgInstance = null

async function openGallery(project, startIndex = 0) {
  if (import.meta.server || !galleryRef.value) return

  const [{ default: lightGallery }, { default: lgZoom }, { default: lgThumbnail }] = await Promise.all([
    import('lightgallery'),
    import('lightgallery/plugins/zoom'),
    import('lightgallery/plugins/thumbnail')
  ])

  if (lgInstance) {
    try {
      lgInstance.destroy()
    } catch (e) {
      // ignore destroy errors
    }
    lgInstance = null
  }

  const dynamicEl = project.images.map((img) => ({
    src: img.src,
    thumb: img.src,
    subHtml: img.subHtml || `<h4>${project.title}</h4><p>${img.alt}</p>`
  }))

  lgInstance = lightGallery(galleryRef.value, {
    dynamic: true,
    dynamicEl,
    plugins: [lgZoom, lgThumbnail],
    speed: 400,
    download: false,
    counter: true,
    thumbnail: true
  })

  lgInstance.openGallery(startIndex)
}

onBeforeUnmount(() => {
  if (lgInstance) {
    try {
      lgInstance.destroy()
    } catch (e) {
      // ignore
    }
  }
})
</script>
