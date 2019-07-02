import Instrument from '../../common/Instrument'

export default class OscillatorSquare extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = 'square' // or sine, triangle, sawtooth, custom
    this.oscillator.frequency.value = 375
    this.oscillator.connect(this.destination)
    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }
}
