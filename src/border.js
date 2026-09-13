/**
 * Living luminous border — highlight orients toward the cursor.
 */

function lerpAngle(current, target, factor) {
  const delta = ((target - current + 540) % 360) - 180
  return current + delta * factor
}

function lerp(current, target, factor) {
  return current + (target - current) * factor
}

export function createBorderController({ button, getMagneticState, getButtonRect }) {
  const state = {
    enabled: true,
    angle: 0,
    targetAngle: 0,
    intensity: 0,
    rafId: null,
  }

  function tick() {
    if (!state.enabled) {
      state.rafId = null
      return
    }

    const magnetic = getMagneticState()

    if (magnetic.inField && magnetic.hasCursor) {
      const rect = getButtonRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = magnetic.cursorX - cx
      const dy = magnetic.cursorY - cy

      state.targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI
      state.intensity = lerp(state.intensity, Math.min(1, magnetic.proximity * 1.15), 0.14)
    } else {
      state.intensity = lerp(state.intensity, 0, 0.08)
    }

    const angleLerp = magnetic.inField ? 0.13 : 0.07
    state.angle = lerpAngle(state.angle, state.targetAngle, angleLerp)

    button.style.setProperty('--highlight-angle', state.angle.toFixed(2))
    button.style.setProperty('--highlight-strength', state.intensity.toFixed(3))

    state.rafId = requestAnimationFrame(tick)
  }

  function ensureLoop() {
    if (state.rafId === null) {
      state.rafId = requestAnimationFrame(tick)
    }
  }

  function enable() {
    if (state.enabled) return
    state.enabled = true
    ensureLoop()
  }

  function disable() {
    state.enabled = false
    state.intensity = 0
    button.style.setProperty('--highlight-strength', '0')
    if (state.rafId !== null) {
      cancelAnimationFrame(state.rafId)
      state.rafId = null
    }
  }

  function bind() {
    ensureLoop()
  }

  function unbind() {
    disable()
  }

  return {
    bind,
    unbind,
    enable,
    disable,
    getState: () => state,
  }
}
