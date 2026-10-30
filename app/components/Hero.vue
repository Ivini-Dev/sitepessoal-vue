<template>
  <section ref="heroTrackRef" class="hero-scroll-track" aria-label="Apresentação Ivini.dev">
    <div class="hero-sticky-container">
      <!-- Fundo de Desconstrução Renderizado via Keyframes em Canvas -->
      <div class="hero-video-wrapper" aria-hidden="true">
        <canvas ref="canvasRef" class="hero-video-canvas"></canvas>
        <div class="hero-video-overlay"></div>
        <div class="hero-bottom-fade"></div>
      </div>

      <!-- Conteúdo Hero Interativo -->
      <div class="hero-content-inner">
        <div class="badge">
          <span class="status-pulse" aria-hidden="true"></span>
          <span>Desenvolvedor Full Stack Sênior & Soluções Corporativas</span>
        </div>

        <h1>
          Engenharia de Software <span class="hero-highlight-text">de Alta Performance</span> & Sustentação de Legados.
        </h1>

        <p>
          Especialista no ecossistema <strong>PHP (Laravel) & Vue/Nuxt</strong>, migrações críticas sem downtime, plataformas SaaS e arquitetura robusta para negócios exigentes.
        </p>

        <div class="hero-actions">
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-cta btn-hero-primary">
            <span>Falar com Especialista</span>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="#servicos" class="btn-cta-secondary">
            Ver Soluções
          </a>
        </div>

        <div class="hero-trust-bar">
          <div class="trust-item">
            <span class="trust-icon" aria-hidden="true">⚡</span>
            <span>Zero Downtime</span>
          </div>
          <div class="trust-divider" aria-hidden="true">•</div>
          <div class="trust-item">
            <span class="trust-icon" aria-hidden="true">🛡️</span>
            <span>Código Limpo & Seguro</span>
          </div>
          <div class="trust-divider" aria-hidden="true">•</div>
          <div class="trust-item">
            <span class="trust-icon" aria-hidden="true">🚀</span>
            <span>Alta Escalabilidade</span>
          </div>
        </div>

        <!-- Indicador Interativo de Keyframes -->
        <div class="hero-scroll-cue" :class="{ 'cue-completed': scrollProgress >= 0.95 }" aria-hidden="true">
          <span class="cue-label">{{ scrollProgress < 0.95 ? 'EXPLORAR' : 'SERVIÇOS & CASES' }}</span>
          <div class="cue-progress-bar">
            <div class="cue-progress-fill" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cue-arrow"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const whatsappUrl = 'https://wa.me/5585991179809?text=Ol%C3%A1%20Ivini!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.'

const heroTrackRef = ref(null)
const canvasRef = ref(null)
const scrollProgress = ref(0)

const START_FRAME = 120 // Começa nos 2.0s da animação (60fps) para preencher a tela instantaneamente
const END_FRAME = 600
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1
const images = new Array(TOTAL_FRAMES)
let currentFrameIndex = 0
let targetFrameIndex = 0
let animFrameId = null
let handleScroll = null
let idleTimerId = null
let intersectionObserver = null
let isHeroVisible = true

function getFrameSrc(frameNumber) {
  return `/frames/frame_${String(frameNumber).padStart(3, '0')}.jpg`
}

// Precarrega primeiro o frame inicial (LCP) e depois carrega os demais em lotes leves
function preloadKeyframes(onFirstFrameReady) {
  const firstImg = new Image()
  firstImg.decoding = 'async'
  firstImg.fetchPriority = 'high'
  firstImg.onload = () => {
    if (onFirstFrameReady) onFirstFrameReady(firstImg)
    scheduleRemainingFrames()
  }
  firstImg.src = getFrameSrc(START_FRAME)
  images[0] = firstImg
}

function scheduleRemainingFrames() {
  let nextIndex = 1
  const BATCH_SIZE = 10

  const loadBatch = () => {
    const limit = Math.min(TOTAL_FRAMES, nextIndex + BATCH_SIZE)
    for (; nextIndex < limit; nextIndex++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = getFrameSrc(START_FRAME + nextIndex)
      images[nextIndex] = img
    }
    if (nextIndex < TOTAL_FRAMES) {
      idleTimerId = window.setTimeout(loadBatch, 60)
    }
  }

  idleTimerId = window.setTimeout(loadBatch, 120)
}

function drawFrame(ctx, canvas, img) {
  if (!img || !img.complete || !img.naturalWidth) return
  
  const dpr = window.devicePixelRatio || 1
  const cw = canvas.width / dpr
  const ch = canvas.height / dpr
  const iw = img.naturalWidth
  const ih = img.naturalHeight

  const scale = Math.max(cw / iw, ch / ih)
  const nw = iw * scale
  const nh = ih * scale
  const cx = (cw - nw) / 2
  const cy = (ch - nh) / 2

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, cx, cy, nw, nh)
  ctx.restore()
}

onMounted(() => {
  const canvas = canvasRef.value
  const track = heroTrackRef.value
  if (!canvas || !track) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const handleResize = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'

    const rounded = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex)))
    if (images[rounded]) {
      drawFrame(ctx, canvas, images[rounded])
    }
  }
  window.addEventListener('resize', handleResize, { passive: true })
  handleResize()

  preloadKeyframes((firstImg) => {
    drawFrame(ctx, canvas, firstImg)
  })

  // Loop de renderização 60fps com lerp suave de keyframe (pausa quando fora da viewport)
  function renderLoop() {
    if (!isHeroVisible) {
      animFrameId = null
      return
    }
    const diff = targetFrameIndex - currentFrameIndex
    if (Math.abs(diff) > 0.005) {
      currentFrameIndex += diff * 0.14
      const roundedIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameIndex)))
      const img = images[roundedIndex]
      if (img && img.complete) {
        drawFrame(ctx, canvas, img)
      }
    }
    animFrameId = requestAnimationFrame(renderLoop)
  }

  const startLoopIfNeeded = () => {
    if (isHeroVisible && !animFrameId) {
      animFrameId = requestAnimationFrame(renderLoop)
    }
  }

  if ('IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        isHeroVisible = entries[0]?.isIntersecting ?? true
        if (isHeroVisible) startLoopIfNeeded()
      },
      { threshold: 0.01 }
    )
    intersectionObserver.observe(track)
  }

  startLoopIfNeeded()

  // Cálculo da posição de scroll na trilha do Hero
  handleScroll = () => {
    const rect = track.getBoundingClientRect()
    const totalScrollable = rect.height - window.innerHeight
    if (totalScrollable <= 0) return

    const currentScroll = -rect.top
    const rawProgress = currentScroll / totalScrollable
    const clampedProgress = Math.max(0, Math.min(1, rawProgress))

    scrollProgress.value = clampedProgress
    targetFrameIndex = Math.round(clampedProgress * (TOTAL_FRAMES - 1))
    startLoopIfNeeded()
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  onUnmounted(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    if (idleTimerId) clearTimeout(idleTimerId)
    if (intersectionObserver) intersectionObserver.disconnect()
    if (handleScroll) window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
})
</script>
