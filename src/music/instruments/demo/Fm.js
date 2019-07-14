import Instrument from '../../common/Instrument'

export default class Fm extends Instrument {
  /**
   * @param {AudioContext} audioContext
   * @param {AudioDestinationNode} destination
   */
  start(audioContext, destination) {
    this.oscillator1 = audioContext.createOscillator()
    this.oscillator1.frequency.value = 220

    this.oscillator2 = audioContext.createOscillator()
    this.oscillator2.frequency.value = 440

    this.modulationGain = audioContext.createGain()
    this.modulationGain.gain.value = 50

    this.oscillator1.connect(this.modulationGain)
    this.modulationGain.connect(this.oscillator2.frequency)
    this.oscillator2.connect(destination)

    this.oscillator1.start()
    this.oscillator2.start()
  }

  stop() {
    this.oscillator1.stop()
    this.oscillator2.stop()
  }

  fxOsc1Frequency(frequency, time) {
    this.oscillator1.frequency.setValueAtTime(
      110 + (440 * frequency) / 255,
      time,
    )
  }

  fxOsc2Frequency(frequency, time) {
    this.oscillator2.frequency.setValueAtTime(
      110 + (440 * frequency) / 255,
      time,
    )
  }

  fxModulationGain(gain, time) {
    this.modulationGain.gain.setValueAtTime((1000 * gain) / 255, time)
  }
}
