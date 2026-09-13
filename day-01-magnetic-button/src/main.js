import './style.css'
import { createMagneticController, MAGNETIC_CONFIG } from './magnetic.js'
import { createBorderController } from './border.js'
import { createSparkleController } from './sparkles.js'
import { createCursorTrailController } from './cursor-trail.js'

const zone = document.getElementById('cta-zone')
const mover = document.getElementById('cta-mover')
const button = document.getElementById('cta-button')
const canvas = document.getElementById('sparkle-canvas')
const trailCanvas = document.getElementById('trail-canvas')

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches

const magnetic = createMagneticController({ mover, zone })
const border = createBorderController({
  button,
  getMagneticState: () => magnetic.getState(),
  getButtonRect: () => magnetic.getButtonRect(),
})
const sparkles = createSparkleController({
  canvas,
  zone,
  getMagneticState: () => magnetic.getState(),
  getBorderState: () => border.getState(),
  getButtonRect: () => magnetic.getButtonRect(),
  magneticRadius: MAGNETIC_CONFIG.radius,
})
const cursorTrail = createCursorTrailController({
  canvas: trailCanvas,
  zone,
  getMagneticState: () => magnetic.getState(),
})

magnetic.bind()
border.bind()
sparkles.bind()
cursorTrail.bind()

function evaluateInteraction() {
  const shouldEnable = !prefersReducedMotion.matches && !isTouchDevice

  if (shouldEnable) {
    magnetic.enable()
    border.enable()
    sparkles.enable()
    cursorTrail.enable()
  } else {
    magnetic.disable()
    border.disable()
    sparkles.disable()
    cursorTrail.disable()
  }
}

evaluateInteraction()
prefersReducedMotion.addEventListener('change', evaluateInteraction)

button.addEventListener('click', () => {
  button.blur()
})
