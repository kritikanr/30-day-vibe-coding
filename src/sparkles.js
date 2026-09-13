/**
 * Cosmic sparkle particles — sparse stars drawn toward the button.
 */

const COLORS = [
  'rgba(140, 160, 255, 1)',
  'rgba(160, 130, 255, 1)',
  'rgba(200, 180, 255, 1)',
  'rgba(255, 255, 255, 1)',
]

const MAX_PARTICLES = 14

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createParticle(canvasWidth, canvasHeight, centerX, centerY, radius) {
  const angle = Math.random() * Math.PI * 2
  const dist = randomBetween(radius * 0.35, radius * 0.95)
  const x = centerX + Math.cos(angle) * dist
  const y = centerY + Math.sin(angle) * dist

  return {
    x,
    y,
    size: randomBetween(0.6, 1.8),
    opacity: randomBetween(0.15, 0.55),
    targetOpacity: randomBetween(0.2, 0.7),
    twinkleSpeed: randomBetween(1.2, 3.2),
    twinklePhase: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    driftAngle: angle + randomBetween(-0.4, 0.4),
    driftSpeed: randomBetween(0.08, 0.22),
    life: 0,
    maxLife: randomBetween(2.5, 5),
  }
}

export function createSparkleController({
  canvas,
  zone,
  mover,
  getMagneticState,
  getButtonCenter,
  magneticRadius,
}) {
  const ctx = canvas.getContext('2d')
  const particles = []
  let enabled = true
  let rafId = null
  let lastTime = 0

  function resize() {
    const rect = zone.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function canvasCenter() {
    const rect = canvas.getBoundingClientRect()
    const buttonCenter = getButtonCenter()
    return {
      x: buttonCenter.x - rect.left,
      y: buttonCenter.y - rect.top,
    }
  }

  function spawnParticles(count, center, radius, intensity) {
    const target = Math.round(MAX_PARTICLES * intensity)
    const toAdd = Math.min(count, target - particles.length)

    for (let i = 0; i < toAdd; i += 1) {
      particles.push(createParticle(canvas.width, canvas.height, center.x, center.y, radius))
    }
  }

  function updateParticles(dt, center, radius, intensity) {
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i]
      p.life += dt

      const dx = center.x - p.x
      const dy = center.y - p.y
      const dist = Math.hypot(dx, dy) || 1
      const pull = 0.35 * intensity + 0.08

      p.x += (dx / dist) * pull + Math.cos(p.driftAngle) * p.driftSpeed
      p.y += (dy / dist) * pull + Math.sin(p.driftAngle) * p.driftSpeed
      p.driftAngle += dt * 0.3

      const twinkle = 0.55 + Math.sin(p.life * p.twinkleSpeed + p.twinklePhase) * 0.45
      const fadeIn = Math.min(p.life / 0.6, 1)
      const fieldFade = intensity > 0.02 ? 1 : Math.max(0, 1 - dt * 2.8)

      p.opacity *= fieldFade
      p.opacity = Math.max(
        0,
        p.targetOpacity * twinkle * fadeIn * (0.4 + intensity * 0.6),
      )

      const edgeDist = Math.hypot(p.x - center.x, p.y - center.y)
      if (p.life > p.maxLife + 0.8 || edgeDist < 8 || p.opacity < 0.02) {
        particles.splice(i, 1)
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    for (const p of particles) {
      ctx.save()
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color
      ctx.shadowBlur = 6
      ctx.shadowColor = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  function tick(timestamp) {
    if (!enabled) {
      rafId = null
      return
    }

    const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016
    lastTime = timestamp

    const magnetic = getMagneticState()
    const center = canvasCenter()
    const intensity = magnetic.inField ? magnetic.proximity : 0

    if (intensity > 0.02) {
      const spawnRate = intensity > 0.3 ? 2 : 1
      if (Math.random() < spawnRate * dt * 3) {
        spawnParticles(1, center, magneticRadius, intensity)
      }
    }

    updateParticles(dt, center, magneticRadius, intensity)
    drawParticles()

    rafId = requestAnimationFrame(tick)
  }

  function ensureLoop() {
    if (rafId === null) {
      lastTime = 0
      rafId = requestAnimationFrame(tick)
    }
  }

  function enable() {
    if (enabled) return
    enabled = true
    resize()
    ensureLoop()
  }

  function disable() {
    enabled = false
    particles.length = 0
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function bind() {
    resize()
    window.addEventListener('resize', resize, { passive: true })
    ensureLoop()
  }

  function unbind() {
    window.removeEventListener('resize', resize)
    disable()
  }

  return { bind, unbind, enable, disable, resize }
}
