import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class Feedback extends Instrument {
  /**
   * @param {AudioContext} audioContext
   * @param {AudioDestinationNode} destination
   */
  start(audioContext, destination) {
    this.vco = audioContext.createOscillator()
    this.vco.type = 'square'

    this.vca = audioContext.createGain()
    this.vca.gain.value = 1

    this.feedback = audioContext.createGain()
    this.feedback.gain.value = 0.5

    this.vco.connect(this.vca)
    this.vca.connect(this.feedback)
    this.feedback.connect(this.feedback)
    this.feedback.connect(destination)

    this.vco.start()
  }

  stop() {
    this.vco.stop()
  }

  fxFreq(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.vco.frequency.setValueAtTime(frequency, time)
    }
  }

  fxGain(gain, time) {
    this.vca.gain.setValueAtTime(gain / 255, time)
  }

  fxFeedback(gain, time) {
    this.feedback.gain.setValueAtTime(gain / 255, time)
  }
}
