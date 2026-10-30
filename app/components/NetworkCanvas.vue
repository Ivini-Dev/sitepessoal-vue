<template>
  <canvas id="network-canvas" ref="canvasRef" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null
let handleResize = null
let handleScroll = null
let handleMouseMove = null
let handleMouseLeave = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize, { passive: true })

  // Rastreamento do centro de gravidade do mouse
  const mouse = { x: -1000, y: -1000, active: false }
  const ATTRACTION_RADIUS = 180 // Raio do campo gravitacional
  const GRAVITY_STRENGTH = 0.05 // Força de atração

  handleMouseMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.active = true
  }

  handleMouseLeave = () => {
    mouse.active = false
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

  const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80)
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      baseVx: (Math.random() - 0.5) * 0.8,
      baseVy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      isFloatingPixel: Math.random() > 0.7
    })
  }

  let scrollGlow = 0.1

  handleScroll = () => {
    const scrollTop = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    if (maxScroll > 0) {
      const scrollPercentage = scrollTop / maxScroll

      if (scrollPercentage <= 0.5) {
        scrollGlow = 0.15 + scrollPercentage * 2 * 0.75
      } else {
        scrollGlow = 0.9 - (scrollPercentage - 0.5) * 2 * 0.75
      }

      scrollGlow = Math.max(0.1, Math.min(0.9, scrollGlow))
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true })

  function animate() {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i]

      // Interação do centro de gravidade e rotação orbital do mouse
      if (mouse.active) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < ATTRACTION_RADIUS && dist > 5) {
          const proximity = 1 - dist / ATTRACTION_RADIUS
          // Força gravitacional radial exponencial (muito mais forte quanto mais perto do mouse)
          const radialForce = proximity * proximity * 0.22
          // Força tangencial (vetor de rotação orbital ao redor do cursor)
          const orbitForce = proximity * 0.15

          const rx = dx / dist
          const ry = dy / dist
          const tx = -ry
          const ty = rx

          p.vx += rx * radialForce + tx * orbitForce
          p.vy += ry * radialForce + ty * orbitForce
          p.vx *= 0.94 // Amortecimento de velocidade para manter órbita fluida e estável
          p.vy *= 0.94
        } else {
          // Fora do raio de atração: retorna gradualmente à velocidade normal de flutuação
          p.vx += (p.baseVx - p.vx) * 0.04
          p.vy += (p.baseVy - p.vy) * 0.04
        }
      } else {
        // Mouse inativo: retorna gradualmente à aceleração normal
        p.vx += (p.baseVx - p.vx) * 0.04
        p.vy += (p.baseVy - p.vy) * 0.04
      }

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > width) {
        p.vx *= -1
        p.baseVx *= -1
      }
      if (p.y < 0 || p.y > height) {
        p.vy *= -1
        p.baseVy *= -1
      }

      if (p.isFloatingPixel) {
        ctx.fillStyle = `rgba(212, 175, 55, ${scrollGlow})`
        ctx.fillRect(p.x, p.y, p.size * 1.5, p.size * 1.5)
      } else {
        ctx.fillStyle = `rgba(163, 204, 90, ${scrollGlow * 0.8})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Conexões entre os pontos da rede
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j]
        let dist = Math.hypot(p.x - p2.x, p.y - p2.y)
        let maxDist = 130

        if (dist < maxDist) {
          let lineAlpha = (1 - dist / maxDist) * scrollGlow

          if (scrollGlow > 0.5 && (i + j) % 3 === 0) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha * 0.8})`
            ctx.lineWidth = 1.2
          } else {
            ctx.strokeStyle = `rgba(126, 159, 72, ${lineAlpha})`
            ctx.lineWidth = 0.8
          }

          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }
    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }
  if (handleScroll) {
    window.removeEventListener('scroll', handleScroll)
  }
  if (handleMouseMove) {
    window.removeEventListener('mousemove', handleMouseMove)
  }
  if (handleMouseLeave) {
    window.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>
