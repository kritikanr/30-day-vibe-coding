/**
 * Cosmic sparkle particles — soft field stars and border energy collection.
 */

const FIELD_COLORS = [
  [88, 72, 210],
  [108, 88, 230],
  [130, 108, 245],
  [170, 155, 255],
]

const BORDER_COLORS = [
  [120, 100, 240],
  [150, 130, 255],
  [190, 175, 255],
]

const MAX_FIELD_PARTICLES = 10
const MAX_BORDER_PARTICLES = 4

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function rgba([r, g, b], alpha) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createFieldParticle(centerX, centerY, radius) {
  const angle = Math.random() * Math.PI * 2
  const dist = randomBetween(radius * 0.45, radius * 0.92)

  return {
    kind: 'field',
    x: centerX + Math.cos(angle) * dist,
    y: centerY + Math.sin(angle) * dist,
    vx: 0,
    vy: 0,
    size: randomBetween(1.2, 2.8),
    opacity: 0,
    targetOpacity: randomBetween(0.35, 0.75),
    fieldStrength: 0,
    twinkleSpeed: randomBetween(0.8, 1.8),
    twinklePhase: Math.random() * Math.PI * 2,
    color: FIELD_COLORS[Math.floor(Math.random() * FIELD_COLORS.length)],
    life: 0,
    maxLife: randomBetween(3, 6),
  }
}

function createBorderParticle(x, y, angle) {
  const tangent = angle + Math.PI / 2
  const spread = randomBetween(-0.35, 0.35)

  return {
    kind: 'border',
    x: x + Math.cos(angle) * randomBetween(-2, 6) + Math.cos(tangent) * spread * 4,
    y: y + Math.sin(angle) * randomBetween(-2, 6) + Math.sin(tangent) * spread * 4,
    vx: Math.cos(tangent) * randomBetween(-0.04, 0.04),
    vy: Math.sin(tangent) * randomBetween(-0.04, 0.04),
    size: randomBetween(0.8, 1.6),
    opacity: 0,
    targetOpacity: randomBetween(0.45, 0.85),
    fieldStrength: 0,
    twinkleSpeed: randomBetween(1.4, 2.6),
    twinklePhase: Math.random() * Math.PI * 2,
    color: BORDER_COLORS[Math.floor(Math.random() * BORDER_COLORS.length)],
    life: 0,
    maxLife: randomBetween(1.2, 2.4),
    homeAngle: angle,
  }
}

function getBorderPoint(angleDeg, buttonRect, canvasRect, outward = 5) {
  const angle = (angleDeg * Math.PI) / 180
  const rx = buttonRect.width / 2
  const ry = buttonRect.height / 2
  const cx = buttonRect.left + rx - canvasRect.left
  const cy = buttonRect.top + ry - canvasRect.top

  return {
    x: cx + (rx + outward) * Math.cos(angle),
    y: cy + (ry + outward) * Math.sin(angle),
  }
}

function drawSoftParticle(ctx, p) {
  const [r, g, b] = p.color
  const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.8)
  glow.addColorStop(0, rgba([r, g, b], p.opacity))
  glow.addColorStop(0.35, rgba([r, g, b], p.opacity * 0.45))
  glow.addColorStop(1, rgba([r, g, b], 0))

  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = rgba([Math.min(r + 30, 255), Math.min(g + 30, 255), 255], p.opacity * 0.85)
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2)
  ctx.fill()
}

export function createSparkleController({
  canvas,
  zone,
  getMagneticState,
  getBorderState,
  getButtonRect,
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
    const buttonCenter = getButtonRect()
    return {
      x: buttonCenter.left + buttonCenter.width / 2 - rect.left,
      y: buttonCenter.top + buttonCenter.height / 2 - rect.top,
    }
  }

  function countByKind(kind) {
    return particles.filter((p) => p.kind === kind).length
  }

  function spawnFieldParticle(center, radius, intensity) {
    const target = Math.round(MAX_FIELD_PARTICLES * intensity)
    if (countByKind('field') >= target) return
    particles.push(createFieldParticle(center.x, center.y, radius))
  }

  function spawnBorderParticle(buttonRect, canvasRect, angle, intensity) {
    const target = Math.round(MAX_BORDER_PARTICLES * intensity)
    if (countByKind('border') >= target) return

    const point = getBorderPoint(angle, buttonRect, canvasRect, 4)
    particles.push(createBorderParticle(point.x, point.y, (angle * Math.PI) / 180))
  }

  function updateFieldParticle(p, dt, center, intensity) {
    const dx = center.x - p.x
    const dy = center.y - p.y
    const dist = Math.hypot(dx, dy) || 1
    const pull = (0.18 * intensity + 0.04) * dt * 60

    p.vx = p.vx * 0.92 + (dx / dist) * pull
    p.vy = p.vy * 0.92 + (dy / dist) * pull
    p.x += p.vx
    p.y += p.vy

    const twinkle = 0.65 + Math.sin(p.life * p.twinkleSpeed + p.twinklePhase) * 0.35
    const fadeIn = Math.min(p.life / 0.8, 1)

    if (intensity > 0.02) {
      p.fieldStrength = Math.min(1, p.fieldStrength + dt * 2.2)
    } else {
      p.fieldStrength = Math.max(0, p.fieldStrength - dt * 2)
    }

    p.opacity = p.targetOpacity * twinkle * fadeIn * p.fieldStrength * (0.5 + intensity * 0.5)

    const edgeDist = Math.hypot(p.x - center.x, p.y - center.y)
    return p.life > p.maxLife + 0.5 || edgeDist < 10 || p.opacity < 0.015
  }

  function updateBorderParticle(p, dt, buttonRect, canvasRect, angle, intensity) {
    const home = getBorderPoint(angle, buttonRect, canvasRect, 4)
    const dx = home.x - p.x
    const dy = home.y - p.y

    p.vx = p.vx * 0.88 + dx * 0.04
    p.vy = p.vy * 0.88 + dy * 0.04
    p.x += p.vx
    p.y += p.vy

    const twinkle = 0.7 + Math.sin(p.life * p.twinkleSpeed + p.twinklePhase) * 0.3
    const fadeIn = Math.min(p.life / 0.35, 1)

    if (intensity > 0.05) {
      p.fieldStrength = Math.min(1, p.fieldStrength + dt * 3.5)
    } else {
      p.fieldStrength = Math.max(0, p.fieldStrength - dt * 3)
    }

    p.opacity = p.targetOpacity * twinkle * fadeIn * p.fieldStrength * intensity

    return p.life > p.maxLife || p.opacity < 0.02
  }

  function tick(timestamp) {
    if (!enabled) {
      rafId = null
      return
    }

    const dt = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0.016
    lastTime = timestamp

    const magnetic = getMagneticState()
    const border = getBorderState()
    const center = canvasCenter()
    const canvasRect = canvas.getBoundingClientRect()
    const buttonRect = getButtonRect()
    const intensity = magnetic.inField ? magnetic.proximity : 0
    const borderIntensity = border.intensity

    if (intensity > 0.03 && Math.random() < dt * 2.2 * intensity) {
      spawnFieldParticle(center, magneticRadius, intensity)
    }

    if (borderIntensity > 0.08 && Math.random() < dt * 4 * borderIntensity) {
      spawnBorderParticle(buttonRect, canvasRect, border.angle, borderIntensity)
    }

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i]
      p.life += dt

      const remove =
        p.kind === 'border'
          ? updateBorderParticle(p, dt, buttonRect, canvasRect, border.angle, borderIntensity)
          : updateFieldParticle(p, dt, center, intensity)

      if (remove) particles.splice(i, 1)
    }

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    for (const p of particles) {
      drawSoftParticle(ctx, p)
    }

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
