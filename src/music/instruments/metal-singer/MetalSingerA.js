import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class MetalSingerA extends Instrument {
  start() {
    this.fm = this.audioContext.createGain()

    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = 'sawtooth'

    this.feedback = this.audioContext.createGain()

    this.formant1Filter = this.audioContext.createBiquadFilter()
    this.formant1Filter.type = 'bandpass'
    this.formant1Filter.frequency.value = Object.values(noteFrequencies)[68]
    this.formant1Filter.Q.value = 11

    this.formant1Gain = this.audioContext.createGain()
    this.formant1Gain.gain.value = 1

    this.formant2Filter = this.audioContext.createBiquadFilter()
    this.formant2Filter.type = 'bandpass'
    this.formant2Filter.frequency.value = Object.values(noteFrequencies)[74]
    this.formant2Filter.Q.value = 32

    this.formant2Gain = this.audioContext.createGain()
    this.formant2Gain.gain.value = 219 / 255

    this.formant3Filter = this.audioContext.createBiquadFilter()
    this.formant3Filter.type = 'bandpass'
    this.formant3Filter.frequency.value = Object.values(noteFrequencies)[90]
    this.formant3Filter.Q.value = 51

    this.formant3Gain = this.audioContext.createGain()
    this.formant3Gain.gain.value = 160 / 255

    this.mixer = this.audioContext.createGain()
    this.mixer.gain.value = (10 * 100) / 255

    this.oscillator.connect(this.feedback)
    this.feedback.connect(this.feedback)
    this.feedback.connect(this.fm)
    this.fm.connect(this.oscillator.frequency)

    this.feedback.connect(this.formant1Filter)
    this.formant1Filter.connect(this.formant1Gain)
    this.formant1Gain.connect(this.mixer)

    this.feedback.connect(this.formant2Filter)
    this.formant2Filter.connect(this.formant2Gain)
    this.formant2Gain.connect(this.mixer)

    this.feedback.connect(this.formant3Filter)
    this.formant3Filter.connect(this.formant3Gain)
    this.formant3Gain.connect(this.mixer)

    this.mixer.connect(this.destination)

    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  fxOscillatorPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.oscillator.frequency.setValueAtTime(frequency, time)
    }
  }

  fxOscillatorType(type) {
    if (type < 64) {
      this.oscillator.type = 'sine'
    } else if (type < 128) {
      this.oscillator.type = 'square'
    } else if (type < 192) {
      this.oscillator.type = 'sawtooth'
    } else {
      this.oscillator.type = 'triangle'
    }
  }

  fxFeedback(gain, time) {
    this.feedback.gain.setValueAtTime(gain / 255, time)
  }

  fxFm(gain, time) {
    this.fm.gain.setValueAtTime(gain, time)
  }

  xfxFormant1Pitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.formant1Filter.frequency.setValueAtTime(frequency, time)
    }
  }

  xfxFormant1Detune(detune, time) {
    this.formant1Filter.detune.setValueAtTime(detune, time)
  }

  xfxFormant1Q(q, time) {
    this.formant1Filter.Q.setValueAtTime(q, time)
  }

  xfxFormant1Gain(gain, time) {
    this.formant1Gain.gain.setValueAtTime(gain / 255, time)
  }

  xfxFormant2Pitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.formant2Filter.frequency.setValueAtTime(frequency, time)
    }
  }

  xfxFormant2Detune(detune, time) {
    this.formant2Filter.detune.setValueAtTime(detune, time)
  }

  xfxFormant2Q(q, time) {
    this.formant2Filter.Q.setValueAtTime(q, time)
  }

  xfxFormant2Gain(gain, time) {
    this.formant2Gain.gain.setValueAtTime(gain / 255, time)
  }

  xfxFormant3Pitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.formant3Filter.frequency.setValueAtTime(frequency, time)
    }
  }

  xfxFormant3Detune(detune, time) {
    this.formant3Filter.detune.setValueAtTime(detune, time)
  }

  xfxFormant3Q(q, time) {
    this.formant3Filter.Q.setValueAtTime(q, time)
  }

  xfxFormant3Gain(gain, time) {
    this.formant3Gain.gain.setValueAtTime(gain / 255, time)
  }

  fxMixer(gain, time) {
    this.mixer.gain.setValueAtTime((10 * gain) / 255, time)
  }
}
