import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'
import NoiseNode from '../../nodes/NoiseNode'

export default class ExtendedKarplusStrong extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.noise = new NoiseNode(context)

    this.pulse = context.createGain()
    this.pulse.gain.value = 0

    this.karplusStrong = new AudioWorkletNode(
      context,
      audioWorklets.extendedKarplusStrongProcessor,
    )

    this.noise
      .connect(this.pulse)
      .connect(this.karplusStrong)
      .connect(destination)

    this.noise.start()
  }

  stop() {
    this.noise.stop()
  }

  noteOn(frequency, time) {
    this.pulse.gain.setValueAtTime(1, time)
    this.pulse.gain.setValueAtTime(0, time + 1 / frequency)
    this.karplusStrong.parameters
      .get('frequency')
      .setValueAtTime(frequency, time)
  }

  fxPickDirection(direction, time) {
    this.karplusStrong.parameters
      .get('pickDirection')
      .setValueAtTime(Math.min(direction, 0.9), time)
  }
}
