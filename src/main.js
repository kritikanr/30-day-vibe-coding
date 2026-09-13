import './style.css'
import { createMagneticController, MAGNETIC_CONFIG } from './magnetic.js'
import { createSparkleController } from './sparkles.js'

const zone = document.getElementById('cta-zone')
const mover = document.getElementById('cta-mover')
const button = document.getElementById('cta-button')
const canvas = document.getElementById('sparkle-canvas')

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches

const magnetic = createMagneticController({ mover, zone })
const sparkles = createSparkleController({
  canvas,
  zone,
  mover,
  getMagneticState: () => magnetic.getState(),
  getButtonCenter: () => magnetic.getButtonCenter(),
  magneticRadius: MAGNETIC_CONFIG.radius,
})

magnetic.bind()
sparkles.bind()

function evaluateInteraction() {
  const shouldEnable = !prefersReducedMotion.matches && !isTouchDevice

  if (shouldEnable) {
    magnetic.enable()
    sparkles.enable()
  } else {
    magnetic.disable()
    sparkles.disable()
  }
}

evaluateInteraction()
prefersReducedMotion.addEventListener('change', evaluateInteraction)

button.addEventListener('click', () => {
  button.blur()
})
