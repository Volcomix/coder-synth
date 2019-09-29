import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'
import noteFrequencies from '../../common/noteFrequencies'
import NoiseNode from '../../nodes/NoiseNode'

export default class ExtendedKarplusStrong extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.frequency = context.createConstantSource()
    this.frequency.offset.value = 220

    this.period = context.createConstantSource()
    this.period.offset.value = 1 / 220

    this.noise = new NoiseNode(context, 2.1)

    this.burst = context.createGain()
    this.burst.gain.value = 0

    this.gain = context.createGain()
    this.gain.gain.value = 1

    this.pickDirection = context.createBiquadFilter()
    this.pickDirection.type = 'highshelf'
    this.pickDirection.frequency.value = 10000

    this.pickPosition = context.createGain()
    this.pickPosition.gain.value = 0.13

    this.pickPositionDelay = context.createDelay()
    this.pickPositionDelay.delayTime.value = 0

    this.pickPositionGain = context.createGain()
    this.pickPositionGain.gain.value = -1

    this.levelFilter = context.createBiquadFilter()
    this.levelFilter.type = 'highshelf'
    this.levelFilter.frequency.value = 10000
    this.levelFilter.gain.value = -10

    this.karplusStrong = new AudioWorkletNode(
      context,
      audioWorklets.karplusStrongProcessor,
    )
    this.karplusStrong.parameters.get('decayTimeT60').value = 4
    this.karplusStrong.parameters.get('brightness').value = 0.5

    this.noise
      .connect(this.burst)
      .connect(this.gain)
      .connect(this.pickDirection)
      .connect(this.pickPositionDelay)
      .connect(this.pickPositionGain)
      .connect(this.levelFilter)
      .connect(this.karplusStrong)
      .connect(destination)

    this.frequency.connect(this.karplusStrong.parameters.get('frequency'))
    this.frequency.connect(this.levelFilter.frequency)

    this.period
      .connect(this.pickPosition)
      .connect(this.pickPositionDelay.delayTime)

    this.pickDirection.connect(this.levelFilter)

    this.frequency.start()
    this.period.start()
    this.noise.start()
  }

  stop() {
    this.frequency.stop()
    this.period.stop()
    this.noise.stop()
  }

  noteOn(_frequency, time) {
    this.burst.gain.setValueAtTime(1, time)
    this.burst.gain.setValueAtTime(0, time + 0.01)
  }

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.frequency.offset.setValueAtTime(frequency, time)
      this.period.offset.setValueAtTime(1 / frequency, time)
    }
  }

  fxGain(gain, time) {
    this.gain.gain.setValueAtTime(gain / 255, time)
  }

  fxPickDirectionFrequency(frequency, time) {
    this.pickDirection.frequency.setValueAtTime(100 * frequency, time)
  }

  fxPickDirection(direction, time) {
    this.pickDirection.gain.setValueAtTime(-direction, time)
  }

  fxPickPosition(position, time) {
    this.pickPosition.gain.setValueAtTime(0.5 * (position / 255), time)
  }

  fxLevelFilterFrequency(frequency, time) {
    this.levelFilter.frequency.setValueAtTime(100 * frequency, time)
  }

  fxLevelFilterGain(gain, time) {
    this.levelFilter.gain.setValueAtTime(-gain, time)
  }

  fxDecayTime(decayTimeT60, time) {
    this.karplusStrong.parameters
      .get('decayTimeT60')
      .setValueAtTime(10 * (decayTimeT60 / 255), time)
  }

  fxBrightness(brightness, time) {
    this.karplusStrong.parameters
      .get('brightness')
      .setValueAtTime(brightness / 255, time)
  }
}
