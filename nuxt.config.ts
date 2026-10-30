// nuxt.config.ts
const seoTitle = 'Desenvolvedor Full Stack Sênior PHP & Vue.js | Ivini.dev'
const seoDescription = 'Engenharia de software B2B com PHP, Laravel, Vue.js e Nuxt.js. Migração de legados sem downtime, SaaS e automação com IA. Fale com um especialista!'
const seoOgImage = 'https://ivini.dev/og-image.jpg'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-22',
  telemetry: false,
  debug: false,
  future: {
    compatibilityVersion: 4
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: seoTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: seoDescription },
        { name: 'author', content: 'Johnatan Ivini - Ivini.dev' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#111315' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph / Facebook / LinkedIn / WhatsApp
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: seoTitle },
        { property: 'og:description', content: seoDescription },
        { property: 'og:image', content: seoOgImage },
        { property: 'og:image:secure_url', content: seoOgImage },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ivini.dev — Engenharia de Software de Alta Performance & Sustentação de Sistemas Legados' },
        { property: 'og:site_name', content: 'Ivini.dev' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:url', content: 'https://ivini.dev/' },

        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seoTitle },
        { name: 'twitter:description', content: seoDescription },
        { name: 'twitter:image', content: seoOgImage },
        { name: 'twitter:image:alt', content: 'Ivini.dev — Engenharia de Software de Alta Performance & Sustentação de Sistemas Legados' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/empresa.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://ivini.dev/' },
        { rel: 'alternate', hreflang: 'pt-BR', href: 'https://ivini.dev/' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://ivini.dev/' },
        { rel: 'preload', as: 'image', href: '/frames/frame_120.jpg', fetchpriority: 'high' }
      ]
    }
  },

  css: [
    'lightgallery/css/lightgallery-bundle.css',
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      leadsApiUrl: process.env.NUXT_PUBLIC_LEADS_API_URL || 'https://cliente.ivini.dev/api/leads'
    }
  },

  nitro: {
    compressPublicAssets: true
  }
})
