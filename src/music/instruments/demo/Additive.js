import Instrument from '../../common/Instrument'

export default class Additive extends Instrument {
  start() {
    this.oscillator1 = this.audioContext.createOscillator()
    this.oscillator1.frequency.value = 220

    this.oscillator2 = this.audioContext.createOscillator()
    this.oscillator2.frequency.value = 440

    this.gain1 = this.audioContext.createGain()
    this.gain1.gain.value = 0.5

    this.gain2 = this.audioContext.createGain()
    this.gain2.gain.value = 0.5

    this.oscillator1.connect(this.gain1)
    this.oscillator2.connect(this.gain2)
    this.gain1.connect(this.destination)
    this.gain2.connect(this.destination)

    this.oscillator1.start()
    this.oscillator2.start()
  }

  stop() {
    this.oscillator1.stop()
    this.oscillator2.stop()
  }

  fxOscillator1Frequency(frequency, time) {
    this.oscillator1.frequency.setValueAtTime(
      110 + (440 * frequency) / 255,
      time,
    )
  }

  fxOscillator2Frequency(frequency, time) {
    this.oscillator2.frequency.setValueAtTime(
      110 + (440 * frequency) / 255,
      time,
    )
  }

  fxGain1(gain, time) {
    this.gain1.gain.setValueAtTime(gain / 255, time)
  }

  fxGain2(gain, time) {
    this.gain2.gain.setValueAtTime(gain / 255, time)
  }
}