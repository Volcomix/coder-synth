import Instrument from '../../common/Instrument'

export default class Envelope extends Instrument {
  peakGain = 1
  sustainGain = 0.5
  attackDuration = 0.2
  decayDuration = 0.2
  releaseDuration = 0.5

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
    this.gain.gain.linearRampToValueAtTime(
      this.peakGain,
      time + this.attackDuration,
    )
    this.gain.gain.linearRampToValueAtTime(
      this.sustainGain,
      time + this.attackDuration + this.decayDuration,
    )
  }

  noteOff(time) {
    this.gain.gain.setValueAtTime(this.sustainGain, time)
    this.gain.gain.linearRampToValueAtTime(0, time + this.releaseDuration)
  }

  fxPeakGain(gain) {
    this.peakGain = gain / 255
  }

  fxSustainGain(gain) {
    this.sustainGain = gain / 255
  }

  fxAttackDuration(duration) {
    this.attackDuration = duration / 255
  }

  fxDecayDuration(duration) {
    this.decayDuration = duration / 255
  }

  fxReleaseDuration(duration) {
    this.releaseDuration = duration / 255
  }
}
