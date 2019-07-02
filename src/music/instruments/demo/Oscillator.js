import Instrument from '../../common/Instrument'

export default class Oscillator extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = 'sine' // Or square, triangle, sawtooth, custom
    this.oscillator.frequency.value = 375
    this.oscillator.connect(this.destination)
    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  noteOn(noteFrequency, time) {
    this.oscillator.frequency.setValueAtTime(noteFrequency, time)
  }

  noteOff(time) {
    this.oscillator.frequency.setValueAtTime(0, time)
  }

  fxFrequency(frequency, time) {
    // Frequency is a value between 0 and 255
    this.oscillator.frequency.setValueAtTime(
      110 + (440 * frequency) / 255,
      time,
    )
  }

  fxShape(shape) {
    switch (shape) {
      case 0:
        this.oscillator.type = 'sine'
        break
      case 1:
        this.oscillator.type = 'square'
        break
      case 2:
        this.oscillator.type = 'triangle'
        break
      case 3:
        this.oscillator.type = 'sawtooth'
        break
    }
  }
}
