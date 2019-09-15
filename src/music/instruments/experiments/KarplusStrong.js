import Instrument from '../../common/Instrument'
import NoiseNode from '../../nodes/NoiseNode'

const frequency = 220

export default class KarplusStrong extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.delayOffset = 128 / context.sampleRate

    this.noise = new NoiseNode(context)

    this.noiseBurst = context.createGain()
    this.noiseBurst.gain.value = 0

    this.feedbackDelay = context.createDelay()
    this.feedbackDelay.delayTime.value = 1 / frequency - this.delayOffset

    this.feedbackFilter = context.createBiquadFilter()
    this.feedbackFilter.type = 'highshelf'
    this.feedbackFilter.gain.value = -20
    this.feedbackFilter.frequency.value = 20000

    this.feedbackGain = context.createGain()
    this.feedbackGain.gain.value = 0.98

    this.noise.connect(this.noiseBurst)
    this.noiseBurst.connect(destination)
    this.noiseBurst.connect(this.feedbackDelay)
    this.feedbackDelay.connect(this.feedbackFilter)
    this.feedbackFilter.connect(this.feedbackGain)
    this.feedbackGain.connect(destination)
    this.feedbackGain.connect(this.feedbackDelay)

    this.noise.start()
  }

  stop() {
    this.noise.stop()
  }

  noteOn(frequency, time) {
    this.noiseBurst.gain.setValueAtTime(1, time)
    this.noiseBurst.gain.setValueAtTime(0, time + 1 / frequency)
  }

  fxFilter(frequency, time) {
    this.feedbackFilter.frequency.setValueAtTime(
      Math.min(frequency * 100, 22050),
      time,
    )
  }

  fxFeedback(gain, time) {
    this.feedbackGain.gain.setValueAtTime(gain / 255, time)
  }
}
