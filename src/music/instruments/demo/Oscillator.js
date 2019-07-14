import Instrument from '../../common/Instrument'

export default class Oscillator extends Instrument {
  /**
   * @param {AudioContext} audioContext
   * @param {AudioDestinationNode} destination
   */
  start(audioContext, destination) {
    this.oscillator = audioContext.createOscillator()
    this.oscillator.type = 'sine' // Or square, triangle, sawtooth, custom
    this.oscillator.frequency.value = 172.3
    this.oscillator.connect(destination)
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
    if (shape < 64) {
      this.oscillator.type = 'sine'
    } else if (shape < 128) {
      this.oscillator.type = 'square'
    } else if (shape < 192) {
      this.oscillator.type = 'triangle'
    } else {
      this.oscillator.type = 'sawtooth'
    }
  }
}
