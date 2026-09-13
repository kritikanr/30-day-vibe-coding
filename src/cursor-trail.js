/**
 * Cursor cosmic trail — stardust emitted along the cursor path inside the magnetic field.
 */

const TRAIL_COLORS = [
  [95, 80, 215],
  [115, 95, 235],
  [140, 120, 250],
  [200, 190, 255],
  [235, 235, 255],
]

const MAX_TRAIL_PARTICLES = 22

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function rgba([r, g, b], alpha) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createTrailParticle(x, y, moveX, moveY) {
  const speed = Math.hypot(moveX, moveY)
  const nx = speed > 0.5 ? -moveX / speed : randomBetween(-1, 1)
  const ny = speed > 0.5 ? -moveY / speed : randomBetween(-1, 1)
  const behind = randomBetween(2, 9)

  return {
    x: x + nx * behind + randomBetween(-1.5, 1.5),
    y: y + ny * behind + randomBetween(-1.5, 1.5),
    vx: nx * randomBetween(0.02, 0.12) + randomBetween(-0.08, 0.08),
    vy: ny * randomBetween(0.02, 0.12) + randomBetween(-0.08, 0.08),
    size: randomBetween(0.45, 1.35),
    peakOpacity: randomBetween(0.35, 0.78),
    maxLife: randomBetween(0.3, 0.7),
    life: 0,
    color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
    twinklePhase: Math.random() * Math.PI * 2,
    star: Math.random() < 0.22,
  }
}

function drawTrailParticle(ctx, p) {
  const lifeRatio = p.life / p.maxLife
  const fadeIn = Math.min(p.life / 0.06, 1)
  const fadeOut = lifeRatio < 0.55 ? 1 : 1 - (lifeRatio - 0.55) / 0.45
  const twinkle = 0.75 + Math.sin(p.life * 14 + p.twinklePhase) * 0.25
  const opacity = p.peakOpacity * fadeIn * fadeOut * twinkle

  if (opacity < 0.02) return

  const [r, g, b] = p.color
  const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2)
  glow.addColorStop(0, rgba([r, g, b], opacity))
  glow.addColorStop(0.4, rgba([r, g, b], opacity * 0.35))
  glow.addColorStop(1, rgba([r, g, b], 0))

  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2)
  ctx.fill()

  if (p.star) {
    ctx.strokeStyle = rgba([Math.min(r + 40, 255), Math.min(g + 40, 255), 255], opacity * 0.7)
    ctx.lineWidth = 0.5
    const s = p.size * 0.9
    ctx.beginPath()
    ctx.moveTo(p.x - s, p.y)
    ctx.lineTo(p.x + s, p.y)
    ctx.moveTo(p.x, p.y - s)
    ctx.lineTo(p.x, p.y + s)
    ctx.stroke()
  } else {
    ctx.fillStyle = rgba([Math.min(r + 25, 255), Math.min(g + 25, 255), 255], opacity * 0.9)
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function createCursorTrailController({
  canvas,
  zone,
  getMagneticState,
}) {
  const ctx = canvas.getContext('2d')
  const particles = []
  let enabled = true
  let rafId = null
  let lastTime = 0
  let lastX = null
  let lastY = null
  let spawnAccumulator = 0

  function resize() {
    const rect = zone.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function cursorToCanvas() {
    const magnetic = getMagneticState()
    const rect = canvas.getBoundingClientRect()
    return {
      x: magnetic.cursorX - rect.left,
      y: magnetic.cursorY - rect.top,
    }
  }

  function spawnAlongPath(x, y, moveX, moveY, distance) {
    if (particles.length >= MAX_TRAIL_PARTICLES) return

    const steps = Math.max(1, Math.floor(distance / 6))
    for (let i = 0; i < steps && particles.length < MAX_TRAIL_PARTICLES; i += 1) {
      const t = (i + 1) / (steps + 1)
      const px = x - moveX * t + randomBetween(-1, 1)
      const py = y - moveY * t + randomBetween(-1, 1)
      particles.push(createTrailParticle(px, py, moveX, moveY))
    }
  }

  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i]
      p.life += dt
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.96
      p.vy *= 0.96

      if (p.life >= p.maxLife) {
        particles.splice(i, 1)
      }
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

    if (magnetic.inField && magnetic.hasCursor) {
      const { x, y } = cursorToCanvas()

      if (lastX !== null && lastY !== null) {
        const moveX = x - lastX
        const moveY = y - lastY
        const distance = Math.hypot(moveX, moveY)
        const speed = distance / dt

        spawnAccumulator += distance

        let interval = 16
        if (speed > 280) interval = 5
        else if (speed > 120) interval = 9
        else if (speed > 40) interval = 13

        while (spawnAccumulator >= interval && particles.length < MAX_TRAIL_PARTICLES) {
          spawnAccumulator -= interval
          if (distance > 0.5) {
            spawnAlongPath(x, y, moveX, moveY, Math.min(distance, interval))
          } else if (Math.random() < dt * 1.5) {
            particles.push(createTrailParticle(x, y, 0, 0))
          }
        }
      } else {
        particles.push(createTrailParticle(x, y, 0, 0))
      }

      lastX = x
      lastY = y
    } else {
      lastX = null
      lastY = null
      spawnAccumulator = 0
    }

    updateParticles(dt)

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    for (const p of particles) {
      drawTrailParticle(ctx, p)
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
    lastX = null
    lastY = null
    spawnAccumulator = 0
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
