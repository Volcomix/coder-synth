import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'

export default class AudioWorkletInstrument extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.oscillator = context.createOscillator()
    this.envelope = context.createGain()
    this.envelope.gain.value = 0
    this.bypasser = new AudioWorkletNode(context, audioWorklets.delayProcessor)
    this.feedback = context.createGain()
    this.feedback.gain.value = 0.9

    this.oscillator.connect(this.envelope).connect(destination)
    this.envelope
      .connect(this.bypasser)
      .connect(this.feedback)
      .connect(this.bypasser)
    this.feedback.connect(destination)

    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  noteOn(frequency, time) {
    this.oscillator.frequency.setValueAtTime(frequency, time)
    this.envelope.gain.setTargetAtTime(0.5, time, 0.01)
  }

  noteOff(time) {
    this.envelope.gain.setTargetAtTime(0, time, 0.01)
  }
}
