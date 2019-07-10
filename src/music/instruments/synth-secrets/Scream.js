import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class Scream extends Instrument {
  start() {
    this.vco = this.audioContext.createOscillator()
    this.vco.type = 'square'

    this.mmg = this.audioContext.createBiquadFilter()
    this.mmg.type = 'lowpass'

    this.vca1 = this.audioContext.createGain()

    this.feedback = this.audioContext.createGain()

    this.vca2 = this.audioContext.createGain()

    this.vco.connect(this.mmg)
    this.mmg.connect(this.vca1)
    this.vca1.connect(this.feedback)
    this.feedback.connect(this.feedback)
    this.feedback.connect(this.vco.frequency)
    this.feedback.connect(this.vca2)
    this.vca2.connect(this.destination)

    this.vco.start()
  }

  stop() {
    this.vco.stop()
  }

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.vco.frequency.setValueAtTime(frequency, time)
    }
  }

  fxMmgFreq(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.mmg.frequency.setValueAtTime(frequency, time)
    }
  }

  fxMmgQ(q, time) {
    this.mmg.Q.setValueAtTime((100 * q) / 255, time)
  }

  fxGain(gain, time) {
    this.vca1.gain.setValueAtTime((10 * gain) / 255, time)
  }

  fxFeedback(feedback, time) {
    this.feedback.gain.setValueAtTime(feedback / 255, time)
  }

  fxVolume(volume, time) {
    this.vca2.gain.setValueAtTime((10 * volume) / 255, time)
  }
}
