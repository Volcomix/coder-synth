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
    this.noise = new NoiseNode(context, 2.1)

    this.burst = context.createGain()
    this.burst.gain.value = 0

    this.pickDirection = context.createBiquadFilter()
    this.pickDirection.type = 'highshelf'
    this.pickDirection.frequency.value = 5000

    this.karplusStrong = new AudioWorkletNode(
      context,
      audioWorklets.karplusStrongProcessor,
    )
    this.karplusStrong.parameters.get('frequency').value = 220
    this.karplusStrong.parameters.get('decayTimeT60').value = 4
    this.karplusStrong.parameters.get('brightness').value = 0.5

    this.offset = context.createConstantSource()
    this.offset.offset.value = 0

    this.pregain = context.createGain()

    this.distortion = context.createWaveShaper()
    this.distortion.curve = Float32Array.from({ length: 4096 }, (v, i) => {
      const x = (i * 2) / 4096 - 1
      return x - (x * x * x) / 3
    })

    this.noise
      .connect(this.burst)
      .connect(this.pickDirection)
      .connect(this.karplusStrong)
      .connect(this.pregain)
      .connect(this.distortion)
      .connect(destination)

    this.offset.connect(this.pregain)

    this.noise.start()
    this.offset.start()
  }

  stop() {
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
      this.karplusStrong.parameters
        .get('frequency')
        .setValueAtTime(frequency, time)
    }
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

  // fxPickDirectionFrequency(frequency, time) {
  //   this.pickDirection.frequency.setValueAtTime(frequency * 100, time)
  // }

  fxPickDirection(direction, time) {
    this.pickDirection.gain.setValueAtTime(direction && -25, time)
  }

  fxOffset(offset, time) {
    this.offset.offset.setValueAtTime((0.5 * offset) / 255, time)
  }

  fxDrive(drive, time) {
    drive = drive / 255
    this.pregain.gain.setValueAtTime(10 ** (2 * drive), time)
  }
}
