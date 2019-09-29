import Instrument from '../../common/Instrument'
import audioWorklets from '../../common/audioWorklets'
import NoiseNode from '../../nodes/NoiseNode'

const distortionCurve = Float32Array.from({ length: 4096 }, (_, i) => {
  const x = 2 * (i / 4096) - 1
  return x - (x * x * x) / 3
})

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
    this.gain.gain.value = 0.3

    this.pickPosition = context.createGain()
    this.pickPosition.gain.value = 0.13

    this.pickPositionDelay = context.createDelay()
    this.pickPositionDelay.delayTime.value = 0

    this.pickPositionGain = context.createGain()
    this.pickPositionGain.gain.value = -1

    this.levelFilter = context.createBiquadFilter()
    this.levelFilter.type = 'highshelf'
    this.levelFilter.frequency.value = 10000
    this.levelFilter.gain.value = -30

    this.karplusStrong = new AudioWorkletNode(
      context,
      audioWorklets.karplusStrongProcessor,
    )
    this.karplusStrong.parameters.get('decayTimeT60').value = 4
    this.karplusStrong.parameters.get('brightness').value = 0.5

    this.drive = context.createGain()
    this.drive.gain.value = 10 ** (2 * 2)

    this.distortion = context.createWaveShaper()
    this.distortion.curve = distortionCurve
    this.distortion.oversample = '4x'

    this.postGain = context.createGain()
    this.postGain.gain.value = 1

    this.feedbackGain = context.createGain()
    this.feedbackGain.gain.value = 0

    this.feedbackDelay = context.createDelay()
    this.feedbackDelay.delayTime.value = 0.1

    this.noise
      .connect(this.burst)
      .connect(this.gain)
      .connect(this.pickPositionDelay)
      .connect(this.pickPositionGain)
      .connect(this.levelFilter)
      .connect(this.karplusStrong)
      .connect(this.drive)
      .connect(this.distortion)
      .connect(this.postGain)
      .connect(destination)

    this.frequency.connect(this.karplusStrong.parameters.get('frequency'))
    this.frequency.connect(this.levelFilter.frequency)

    this.period
      .connect(this.pickPosition)
      .connect(this.pickPositionDelay.delayTime)

    this.gain.connect(this.levelFilter)

    this.distortion
      .connect(this.feedbackGain)
      .connect(this.feedbackDelay)
      .connect(this.karplusStrong)

    this.frequency.start()
    this.period.start()
    this.noise.start()
  }

  stop() {
    this.frequency.stop()
    this.period.stop()
    this.noise.stop()
    this.karplusStrong.parameters.get('decayTimeT60').value = 0
    this.feedbackGain.gain.value = 0
  }

  noteOn(frequency, time) {
    const period = 1 / frequency
    this.burst.gain.setValueAtTime(1, time)
    this.burst.gain.setValueAtTime(0, time + period)
    this.frequency.offset.setValueAtTime(frequency, time)
    this.period.offset.setValueAtTime(period, time)
  }

  fxPickPosition(position, time) {
    this.pickPosition.gain.setValueAtTime(0.5 * (position / 255), time)
  }

  fxLevelFilter(gain, time) {
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

  fxDrive(drive, time) {
    drive = 10 * (drive / 255)
    this.drive.gain.setValueAtTime(10 ** (2 * drive), time)
  }

  fxPostGain(gain, time) {
    this.postGain.gain.setValueAtTime(gain / 255, time)
  }

  fxFeedbackGain(gain, time) {
    this.feedbackGain.gain.setValueAtTime(0.02 * (gain / 255), time)
  }

  fxFeedbackFrequency(frequency, time) {
    this.feedbackDelay.delayTime.setValueAtTime(1 / (10 * frequency), time)
  }
}
