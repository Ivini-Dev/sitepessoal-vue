<template>
  <div id="top">
    <ClientOnly>
      <NetworkCanvas />
      <ChatbotModal />
    </ClientOnly>
    <Menu />
    <Sections />
    <Footer />
  </div>
</template>

<script setup>
const seoTitle = 'Desenvolvedor Full Stack Sênior PHP & Vue.js | Ivini.dev'
const seoDescription = 'Engenharia de software B2B com PHP, Laravel, Vue.js e Nuxt.js. Migração de legados sem downtime, SaaS e automação com IA. Fale com um especialista!'
const seoOgImage = 'https://ivini.dev/og-image.jpg'

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://ivini.dev/#website',
      'url': 'https://ivini.dev/',
      'name': 'Ivini.dev',
      'alternateName': 'Ivini.dev Soluções em Tecnologia',
      'description': seoDescription,
      'inLanguage': 'pt-BR',
      'publisher': {
        '@id': 'https://ivini.dev/#organization'
      }
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://ivini.dev/#webpage',
      'url': 'https://ivini.dev/',
      'name': seoTitle,
      'description': seoDescription,
      'inLanguage': 'pt-BR',
      'isPartOf': {
        '@id': 'https://ivini.dev/#website'
      },
      'about': {
        '@id': 'https://ivini.dev/#organization'
      },
      'mainEntity': {
        '@id': 'https://ivini.dev/#person'
      },
      'primaryImageOfPage': {
        '@type': 'ImageObject',
        'url': seoOgImage,
        'width': 1200,
        'height': 630
      },
      'datePublished': '2024-01-15T00:00:00-03:00',
      'dateModified': '2026-10-30T10:30:00-03:00'
    },
    {
      '@type': 'Person',
      '@id': 'https://ivini.dev/#person',
      'name': 'Johnatan Ivini',
      'url': 'https://ivini.dev/',
      'image': {
        '@type': 'ImageObject',
        'url': 'https://ivini.dev/logo-ivini.png',
        'width': 512,
        'height': 512
      },
      'jobTitle': 'Desenvolvedor Full Stack Sênior & Arquiteto de Software',
      'description': 'Desenvolvedor Full Stack Sênior especializado em PHP (5.x a 8.x), Laravel, Vue.js e Nuxt.js. Especialista em arquitetura de software B2B, plataformas SaaS, automações com Inteligência Artificial e sustentação de sistemas legados sem downtime.',
      'worksFor': {
        '@id': 'https://ivini.dev/#organization'
      },
      'sameAs': [
        'https://github.com/johnatanivini',
        'https://www.linkedin.com/in/johnatanivini',
        'https://wa.me/5585991179809'
      ],
      'knowsLanguage': ['pt-BR', 'en'],
      'knowsAbout': [
        'PHP 8',
        'Laravel',
        'Vue.js',
        'Nuxt.js',
        'Sustentação de Sistemas Legados',
        'Migração de Software sem Downtime',
        'Arquitetura de Software Limpa (Clean Code)',
        'Plataformas SaaS Multi-tenant',
        'Inteligência Artificial Aplicada',
        'Automação de Processos e Web Scraping',
        'Docker',
        'Google Cloud Platform',
        'MySQL',
        'PostgreSQL',
        'Redis'
      ]
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://ivini.dev/#organization',
      'name': 'Ivini.dev — Soluções em Tecnologia',
      'alternateName': 'Ivini.dev',
      'url': 'https://ivini.dev/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ivini.dev/logo-ivini.png',
        'width': 512,
        'height': 512
      },
      'image': seoOgImage,
      'description': seoDescription,
      'founder': {
        '@id': 'https://ivini.dev/#person'
      },
      'telephone': '+55-85-99117-9809',
      'priceRange': '$$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Fortaleza',
        'addressRegion': 'CE',
        'addressCountry': 'BR'
      },
      'areaServed': {
        '@type': 'Country',
        'name': 'Brasil'
      },
      'sameAs': [
        'https://github.com/johnatanivini',
        'https://www.linkedin.com/in/johnatanivini',
        'https://wa.me/5585991179809'
      ],
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+55-85-99117-9809',
          'contactType': 'sales',
          'availableLanguage': ['Portuguese', 'English'],
          'areaServed': 'BR'
        }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Soluções Corporativas & Engenharia de Software',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Migração & Sustentação de Sistemas Legados',
              'description': 'Evolução segura e manutenção especializada de aplicações em PHP 5+ até PHP 8 e Laravel moderno, eliminando dívidas técnicas sem downtime.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Desenvolvimento de Aplicações Web, SaaS & APIs',
              'description': 'Desenvolvimento de sistemas corporativos customizados, plataformas SaaS multi-tenant, microsserviços e painéis administrativos com Laravel e Vue.js/Nuxt.js.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Automação Inteligente, IA & Integrações B2B',
              'description': 'Arquitetura de bots de prospecção, agentes com Inteligência Artificial (Gemini, Groq, Ollama), extração de dados com Playwright e automações via WhatsApp e gateways de pagamento.'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Otimização de Performance, Cloud & Segurança WordPress',
              'description': 'Aceleração de Core Web Vitals, infraestrutura em containers Docker/Cloud, auditoria de segurança (hardening) e suporte técnico contínuo.'
            }
          }
        ]
      }
    },
    {
      '@type': 'ItemList',
      '@id': 'https://ivini.dev/#portfolio',
      'name': 'Projetos & Cases SaaS em Produção — Ivini.dev',
      'itemListOrder': 'https://schema.org/ItemListOrderAscending',
      'numberOfItems': 5,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'WebApplication',
            'name': 'Buxin',
            'url': 'https://web.buxin.com.br',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Web',
            'image': 'https://ivini.dev/images/buxin-landing.webp',
            'description': 'Plataforma SaaS White Label para gestão de delivery e automação de pedidos para restaurantes e açaíterias, com painel Kanban em tempo real e cardápio digital.',
            'author': { '@id': 'https://ivini.dev/#person' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'item': {
            '@type': 'WebApplication',
            'name': 'Reforcy',
            'url': 'https://reforcy.com.br',
            'applicationCategory': 'EducationalApplication',
            'operatingSystem': 'Web',
            'image': 'https://ivini.dev/images/reforcy-dashboard.webp',
            'description': 'Plataforma SaaS para professores particulares com gestão de alunos, planejamento pedagógico com Inteligência Artificial, controle financeiro e cobranças via WhatsApp.',
            'author': { '@id': 'https://ivini.dev/#person' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'item': {
            '@type': 'WebApplication',
            'name': 'Portal de Clientes & Faturamento Ivini.dev',
            'url': 'https://clientes.ivini.dev',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Web',
            'image': 'https://ivini.dev/images/clientes-painel.webp',
            'description': 'Sistema corporativo de faturamento, homologação de entregas, assinatura de contratos digitais e checkout transparente PIX e Cartão via Mercado Pago.',
            'author': { '@id': 'https://ivini.dev/#person' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'item': {
            '@type': 'WebApplication',
            'name': 'Ivini LeadBot',
            'url': 'https://ivini-leads-bots.ivini.dev',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Web',
            'image': 'https://ivini.dev/images/leads.webp',
            'description': 'Ecossistema B2B de prospecção automatizada com web scraping no Google Maps, geração automática de Landing Pages com IA Híbrida e abordagem comercial via WhatsApp.',
            'author': { '@id': 'https://ivini.dev/#person' }
          }
        },
        {
          '@type': 'ListItem',
          'position': 5,
          'item': {
            '@type': 'WebApplication',
            'name': 'Ajeita Cursos',
            'url': 'https://ajeitacursos.com.br/',
            'applicationCategory': 'EducationalApplication',
            'operatingSystem': 'Web',
            'image': 'https://ivini.dev/images/ajeita-cursos.webp',
            'description': 'Plataforma SaaS full-stack que converte PDFs e temas em cursos estruturados e interativos utilizando Inteligência Artificial (Google Gemini e Grok).',
            'author': { '@id': 'https://ivini.dev/#person' }
          }
        }
      ]
    }
  ]
}

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  title: seoTitle,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaData)
    }
  ]
})

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: seoOgImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: 'Ivini.dev — Engenharia de Software de Alta Performance & Sustentação de Sistemas Legados',
  ogType: 'website',
  ogUrl: 'https://ivini.dev/',
  ogLocale: 'pt_BR',
  ogSiteName: 'Ivini.dev',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: seoOgImage,
  twitterImageAlt: 'Ivini.dev — Engenharia de Software de Alta Performance & Sustentação de Sistemas Legados'
})
</script>
