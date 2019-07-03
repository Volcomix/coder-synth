import Instrument from '../../common/Instrument'

export default class Envelope extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.frequency.value = 172.3
    this.gain = this.audioContext.createGain()
    this.gain.gain.value = 1
    this.oscillator.connect(this.gain)
    this.gain.connect(this.destination)
    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  noteOn(noteFrequency, time) {
    this.oscillator.frequency.setValueAtTime(noteFrequency, time)
    this.gain.gain.setValueAtTime(0, time)
    this.gain.gain.linearRampToValueAtTime(1, time + 0.2)
    this.gain.gain.linearRampToValueAtTime(0.5, time + 0.4)
  }

  noteOff(time) {
    this.gain.gain.setValueAtTime(0.5, time)
    this.gain.gain.linearRampToValueAtTime(0, time + 0.5)
  }
}
