<template>
  <div>
    <ClientOnly>
      <NetworkCanvas />
    </ClientOnly>
    <Menu />
    <Sections />
    <Footer />
  </div>
</template>

<script setup>
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Johnatan Ivini',
  'url': 'https://ivini.dev',
  'image': 'https://ivini.dev/empresa.png',
  'jobTitle': 'Desenvolvedor Full Stack Sênior',
  'description': 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.',
  'worksFor': {
    '@type': 'Organization',
    'name': 'Ivini.dev'
  },
  'sameAs': [
    'https://wa.me/5585991179809',
    'https://github.com/johnatanivini',
    'https://www.linkedin.com/in/johnatanivini'
  ],
  'knowsAbout': [
    'PHP',
    'Laravel',
    'Vue.js',
    'Nuxt.js',
    'Docker',
    'Google Cloud',
    'MySQL',
    'PostgreSQL',
    'Clean Code',
    'Sustentação de Legados',
    'Arquitetura de Software',
    'Automação de Processos'
  ]
}

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  title: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaData)
    }
  ]
})

useSeoMeta({
  title: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas',
  ogTitle: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas',
  description: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.',
  ogDescription: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.',
  ogImage: 'https://ivini.dev/empresa.png',
  ogType: 'website',
  ogUrl: 'https://ivini.dev/',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Ivini.dev | Desenvolvedor Full Stack Sênior & Soluções Corporativas',
  twitterDescription: 'Desenvolvedor Full Stack Sênior especializado em PHP, Laravel, Vue.js e Nuxt.js. Crio soluções corporativas, automações, migrações de legados e aplicações web de alta performance.',
  twitterImage: 'https://ivini.dev/empresa.png'
})
</script>
