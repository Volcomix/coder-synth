import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'
import NoiseNode from '../../nodes/NoiseNode'

export default class KarplusStrongWorklet extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.noise = new NoiseNode(context)

    this.pulse = context.createGain()
    this.pulse.gain.value = 0

    this.gain = context.createGain()
    this.gain.gain.value = 1

    this.karplusStrong = new AudioWorkletNode(
      context,
      audioWorklets.karplusStrongProcessor,
    )
    this.karplusStrong.parameters.get('decayTimeT60').value = 4
    this.karplusStrong.parameters.get('brightness').value = 0.5

    this.widthDelay = context.createDelay()

    this.stereoPanner = context.createChannelMerger(2)

    this.noise
      .connect(this.pulse)
      .connect(this.gain)
      .connect(this.karplusStrong)
      .connect(this.stereoPanner, 0, 0)
      .connect(destination)

    this.karplusStrong.connect(this.widthDelay).connect(this.stereoPanner, 0, 1)

    this.noise.start()
  }

  stop() {
    this.noise.stop()
  }

  noteOn(frequency, time) {
    const rnd = 0.005 * (Math.random() * 2 - 1)
    time += rnd
    this.pulse.gain.setValueAtTime(1, time)
    this.pulse.gain.setValueAtTime(0, time + 1 / frequency)
    this.karplusStrong.parameters
      .get('frequency')
      .setValueAtTime(frequency, time)
    this.widthDelay.delayTime.setValueAtTime(0.5 / frequency, time)
    this.karplusStrong.parameters
      .get('decayTimeT60')
      .setValueAtTime(3 + Math.random() * 4, time)
    this.karplusStrong.parameters
      .get('brightness')
      .setValueAtTime(Math.random() * 0.7, time)
  }

  fxGain(gain, time) {
    this.gain.gain.setValueAtTime((10 * gain) / 255, time)
  }

  fxDecayTimeT60(decayTimeT60, time) {
    this.karplusStrong.parameters
      .get('decayTimeT60')
      .setValueAtTime((10 * decayTimeT60) / 255, time)
  }

  fxBrightness(brightness, time) {
    this.karplusStrong.parameters
      .get('brightness')
      .setValueAtTime(brightness / 255, time)
  }
}
