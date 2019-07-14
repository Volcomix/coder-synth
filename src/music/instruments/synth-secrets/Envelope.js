import Instrument from '../../common/Instrument'

export default class Part3Envelope extends Instrument {
  attack = 7 / 255
  decay = 40 / 255
  sustain = 59 / 255
  release = 118 / 255

  /**
   * @param {AudioContext} audioContext
   * @param {AudioDestinationNode} destination
   */
  start(audioContext, destination) {
    this.oscillator = audioContext.createOscillator()
    this.envelope = audioContext.createGain()
    this.envelope.gain.value = 0
    this.volume = audioContext.createGain()
    this.volume.gain.value = (2 * 176) / 255

    this.oscillator.connect(this.envelope)
    this.envelope.connect(this.volume)
    this.volume.connect(destination)

    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  noteOn(frequency, time) {
    this.oscillator.frequency.setValueAtTime(frequency, time)
    this.envelope.gain.setTargetAtTime(1, time, this.attack)
    this.envelope.gain.setTargetAtTime(
      this.sustain,
      time + this.attack,
      this.decay,
    )
  }

  noteOff(time) {
    this.envelope.gain.setTargetAtTime(0, time, this.release)
  }

  fxAttackTime(duration) {
    this.attack = (1 * duration) / 255
  }

  fxDecayTime(duration) {
    this.decay = (1 * duration) / 255
  }

  fxSustainLevel(level) {
    this.sustain = level / 255
  }

  fxReleaseTime(duration) {
    this.release = (1 * duration) / 255
  }

  fxVolume(level, time) {
    this.volume.gain.setValueAtTime((2 * level) / 255, time)
  }
}
