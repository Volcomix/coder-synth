import Instrument from '../common/Instrument'

export default class Simple extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.gain = this.audioContext.createGain()
    this.oscillator.connect(this.gain)
    this.gain.connect(this.audioContext.destination)
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

  fxVolume(volume, time) {
    this.gain.gain.setValueAtTime(volume / 255, time)
  }
}
