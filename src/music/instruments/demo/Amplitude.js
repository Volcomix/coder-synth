import Instrument from '../../common/Instrument'

export default class Amplitude extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.frequency.value = 172.3
    this.gain = this.audioContext.createGain()
    this.gain.gain.value = 0.5
    this.oscillator.connect(this.gain)
    this.gain.connect(this.destination)
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

  fxGain(gain, time) {
    this.gain.gain.linearRampToValueAtTime(gain / 255, time)
  }
}
