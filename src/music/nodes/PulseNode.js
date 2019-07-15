const curve = Float32Array.from({ length: 256 }, (_, i) => (i < 128 ? -1 : 1))

export default class PulseNode {
  /**
   * @param {AudioContext} context
   */
  constructor(context) {
    const oscillator = context.createOscillator()
    oscillator.type = 'sawtooth'

    const constant = context.createConstantSource()
    constant.offset.value = 0

    const shaper = context.createWaveShaper()
    shaper.curve = curve

    oscillator.connect(shaper)
    constant.connect(shaper)

    Object.defineProperty(oscillator, 'width', {
      get() {
        return constant.offset
      },
    })

    const start = oscillator.start.bind(oscillator)
    const stop = oscillator.stop.bind(oscillator)

    oscillator.start = (...args) => {
      start(...args)
      constant.start(...args)
    }

    oscillator.stop = (...args) => {
      stop(...args)
      constant.stop(...args)
    }

    oscillator.connect = (...args) => {
      shaper.connect(...args)
    }

    oscillator.disconnect = (...args) => {
      shaper.disconnect(...args)
    }

    return oscillator
  }
}
