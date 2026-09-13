/**
 * Magnetic button movement — distance-based attraction with smooth lerping.
 */

export const MAGNETIC_CONFIG = {
  radius: 140,
  maxMovement: 20,
  attractLerp: 0.14,
  returnLerp: 0.1,
}

function lerp(current, target, factor) {
  return current + (target - current) * factor
}

export function createMagneticController({ mover, zone, config = MAGNETIC_CONFIG }) {
  const state = {
    enabled: true,
    cursorX: 0,
    cursorY: 0,
    hasCursor: false,
    offsetX: 0,
    offsetY: 0,
    targetX: 0,
    targetY: 0,
    proximity: 0,
    inField: false,
    rafId: null,
  }

  function getButtonCenter() {
    const rect = mover.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  function updateTargets() {
    const center = getButtonCenter()
    const dx = state.cursorX - center.x
    const dy = state.cursorY - center.y
    const distance = Math.hypot(dx, dy)

    if (!state.hasCursor || distance > config.radius) {
      state.inField = false
      state.proximity = 0
      state.targetX = 0
      state.targetY = 0
      return
    }

    state.inField = true
    const normalized = 1 - distance / config.radius
    const falloff = normalized * normalized
    state.proximity = falloff

    const angle = Math.atan2(dy, dx)
    const pull = config.maxMovement * falloff

    state.targetX = Math.cos(angle) * pull
    state.targetY = Math.sin(angle) * pull
  }

  function tick() {
    if (!state.enabled) {
      state.rafId = null
      return
    }

    updateTargets()

    const lerpFactor = state.inField ? config.attractLerp : config.returnLerp
    state.offsetX = lerp(state.offsetX, state.targetX, lerpFactor)
    state.offsetY = lerp(state.offsetY, state.targetY, lerpFactor)

    mover.style.transform = `translate3d(${state.offsetX}px, ${state.offsetY}px, 0)`

    zone.classList.toggle('is-active', state.inField && state.proximity > 0.05)

    state.rafId = requestAnimationFrame(tick)
  }

  function ensureLoop() {
    if (state.rafId === null) {
      state.rafId = requestAnimationFrame(tick)
    }
  }

  function onPointerMove(event) {
    if (!state.enabled) return
    state.cursorX = event.clientX
    state.cursorY = event.clientY
    state.hasCursor = true
    ensureLoop()
  }

  function onPointerLeave() {
    if (!state.enabled) return
    state.hasCursor = false
    ensureLoop()
  }

  function enable() {
    if (state.enabled) return
    state.enabled = true
    ensureLoop()
  }

  function disable() {
    state.enabled = false
    state.inField = false
    state.proximity = 0
    state.targetX = 0
    state.targetY = 0
    state.offsetX = 0
    state.offsetY = 0
    mover.style.transform = ''
    zone.classList.remove('is-active')

    if (state.rafId !== null) {
      cancelAnimationFrame(state.rafId)
      state.rafId = null
    }
  }

  function bind() {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    ensureLoop()
  }

  function unbind() {
    window.removeEventListener('pointermove', onPointerMove)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    disable()
  }

  return {
    bind,
    unbind,
    enable,
    disable,
    getState: () => state,
    getButtonCenter,
  }
}
