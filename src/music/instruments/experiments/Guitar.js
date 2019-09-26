import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'
import noteFrequencies from '../../common/noteFrequencies'
import NoiseNode from '../../nodes/NoiseNode'

export default class Guitar extends Instrument {
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

    this.offset = context.createConstantSource()
    this.offset.offset.value = 0

    this.preGain = context.createGain()

    this.distortion = context.createWaveShaper()
    this.distortion.curve = Float32Array.from({ length: 4096 }, (v, i) => {
      const x = (i * 2) / 4096 - 1
      return x - (x * x * x) / 3
    })
    this.distortion.oversample = '4x'

    this.dcBlocker = context.createBiquadFilter()
    this.dcBlocker.type = 'lowshelf'
    this.dcBlocker.frequency.value = 30
    this.dcBlocker.gain.value = -10

    this.postGain = context.createGain()
    this.postGain.gain.value = 0

    this.directGain = context.createGain()

    this.feedbackGain = context.createGain()
    this.feedbackGain.gain.value = 0

    this.feedbackDelay = context.createDelay()
    this.feedbackDelay.delayTime.value = 0.1

    this.noise
      .connect(this.burst)
      .connect(this.gain)
      .connect(this.pickDirection)
      .connect(this.pickPositionDelay)
      .connect(this.pickPositionGain)
      .connect(this.levelFilter)
      .connect(this.karplusStrong)
      .connect(this.preGain)
      .connect(this.distortion)
      .connect(this.dcBlocker)
      .connect(this.postGain)
      .connect(destination)

    this.frequency.connect(this.karplusStrong.parameters.get('frequency'))
    this.frequency.connect(this.levelFilter.frequency)

    this.period
      .connect(this.pickPosition)
      .connect(this.pickPositionDelay.delayTime)

    this.pickDirection.connect(this.levelFilter)
    this.offset.connect(this.preGain)

    this.karplusStrong.connect(this.directGain).connect(destination)

    this.dcBlocker
      .connect(this.feedbackGain)
      .connect(this.feedbackDelay)
      .connect(this.karplusStrong)

    this.frequency.start()
    this.period.start()
    this.noise.start()
    this.offset.start()
  }

  stop() {
    this.frequency.stop()
    this.period.stop()
    this.noise.stop()
    this.offset.stop()
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
    this.gain.gain.setValueAtTime((10 * gain) / 255, time)
  }

  fxPickDirectionFrequency(frequency, time) {
    this.pickDirection.frequency.setValueAtTime(frequency * 100, time)
  }

  fxPickDirection(direction, time) {
    this.pickDirection.gain.setValueAtTime(direction && -25, time)
  }

  fxPickPosition(position, time) {
    this.pickPosition.gain.setValueAtTime((0.5 * position) / 255, time)
  }

  fxLevelFilterFrequency(frequency, time) {
    this.levelFilter.frequency.setValueAtTime(frequency * 100, time)
  }

  fxLevelFilterGain(gain, time) {
    this.levelFilter.gain.setValueAtTime(-gain, time)
  }

  fxDecayTime(decayTimeT60, time) {
    this.karplusStrong.parameters
      .get('decayTimeT60')
      .setValueAtTime((10 * decayTimeT60) / 255, time)
  }

  fxBrightness(brightness, time) {
    this.karplusStrong.parameters
      .get('brightness')
      .setValueAtTime(brightness / 255, time)
  }

  fxOffset(offset, time) {
    this.offset.offset.setValueAtTime((0.5 * offset) / 255, time)
  }

  fxDrive(drive, time) {
    drive = drive / 255
    this.preGain.gain.setValueAtTime(10 ** (2 * drive), time)
  }

  fxPostGain(gain, time) {
    this.postGain.gain.setValueAtTime(gain / 255, time)
  }

  fxDirectGain(gain, time) {
    this.directGain.gain.setValueAtTime(gain / 255, time)
  }

  fxFeedbackGain(gain, time) {
    this.feedbackGain.gain.setValueAtTime((0.01 * gain) / 255, time)
  }

  fxFeedbackDelay(delay, time) {
    this.feedbackDelay.delayTime.setValueAtTime((0.1 * delay) / 255, time)
  }

  fxDcBlockFrequency(frequency, time) {
    this.dcBlocker.frequency.setValueAtTime(10 * frequency, time)
  }

  fxDcBlockerGain(gain, time) {
    this.dcBlocker.gain.setValueAtTime(-gain, time)
  }
}
