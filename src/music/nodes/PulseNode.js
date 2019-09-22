const curve = Float32Array.from({ length: 256 }, (_, i) => (i < 128 ? -1 : 1))

export default class PulseNode extends OscillatorNode {
  /**
   * @param {AudioContext} context
   */
  constructor(context) {
    super(context)
    Object.setPrototypeOf(this, PulseNode.prototype)

    super.type = 'sawtooth'

    this.constant = context.createConstantSource()
    this.constant.offset.value = 0

    this.shaper = context.createWaveShaper()
    this.shaper.curve = curve

    super.connect(this.shaper)
    this.constant.connect(this.shaper)
  }

  get width() {
    return this.constant.offset
  }

  start(...args) {
    super.start(...args)
    return this.constant.start(...args)
  }

  stop(...args) {
    super.stop(...args)
    return this.constant.stop(...args)
  }

  connect(...args) {
    return this.shaper.connect(...args)
  }

  disconnect(...args) {
    return this.shaper.disconnect(...args)
  }
}
