// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-07-22',
  debug:true,
  future: {
    compatibilityVersion: 4
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.' },
        { name: 'keywords', content: 'Desenvolvedor Full Stack, PHP, Laravel, Vue.js, Nuxt.js, Automação, Sustentação de Legados, Google Cloud, Docker, MySQL, PostgreSQL, Clean Code, Arquitetura de Software' },
        { name: 'author', content: 'Johnatan Ivini - Ivini.dev' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas' },
        { property: 'og:description', content: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.' },
        { property: 'og:image', content: 'https://ivini.dev/empresa.png' },
        { property: 'og:site_name', content: 'Ivini.dev' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:url', content: 'https://ivini.dev/' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas' },
        { name: 'twitter:description', content: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.' },
        { name: 'twitter:image', content: 'https://ivini.dev/empresa.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/empresa.png' },
        { rel: 'canonical', href: 'https://ivini.dev/' }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  nitro: {
    compressPublicAssets: true
  }
})
