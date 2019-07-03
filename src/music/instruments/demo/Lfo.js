import Instrument from '../../common/Instrument'

export default class Lfo extends Instrument {
  start() {
    this.lfo = this.audioContext.createOscillator()
    this.lfo.frequency.value = 1

    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.frequency.value = 440

    this.modulationGain = this.audioContext.createGain()
    this.modulationGain.gain.value = 50

    this.lfo.connect(this.modulationGain)
    this.modulationGain.connect(this.oscillator.detune)
    this.oscillator.connect(this.destination)

    this.lfo.start()
    this.oscillator.start()
  }

  stop() {
    this.lfo.stop()
    this.oscillator.stop()
  }

  fxLfoFrequency(frequency, time) {
    this.lfo.frequency.setValueAtTime((10 * frequency) / 255, time)
  }

  fxModulationGain(gain, time) {
    this.modulationGain.gain.setValueAtTime((1000 * gain) / 255, time)
  }
}
