import noteFrequencies from '../../common/noteFrequencies'
import Instrument from '../../common/Instrument'

export default class Oscillator extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
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
    const noteFrequency = Object.values(noteFrequencies)[frequency]
    if (noteFrequency !== undefined) {
      this.oscillator.frequency.setValueAtTime(noteFrequency, time)
    }
  }

  fxDetune(detune, time) {
    this.oscillator.detune.setValueAtTime(detune, time)
  }
}
