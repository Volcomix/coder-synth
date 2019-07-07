import Instrument from '../../common/Instrument'

export default class Part1Subtractive extends Instrument {
  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = 'square'
    this.oscillator.frequency.value = 110 + (880 * 18) / 255

    this.filter = this.audioContext.createBiquadFilter()
    this.filter.frequency.value = 110 + (2 * 2 * 2 * 440 * 34) / 255

    this.gain = this.audioContext.createGain()
    this.gain.gain.value = (2 * 95) / 255

    this.oscillator.connect(this.filter)
    this.filter.connect(this.gain)
    this.gain.connect(this.destination)

    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  fxType(type) {
    if (type < 64) {
      this.oscillator.type = 'sine'
    } else if (type < 128) {
      this.oscillator.type = 'square'
    } else if (type < 192) {
      this.oscillator.type = 'triangle'
    } else {
      this.oscillator.type = 'sawtooth'
    }
  }

  fxFrequency(frequency, time) {
    this.oscillator.frequency.setValueAtTime(
      110 + (880 * frequency) / 255,
      time,
    )
  }

  fxFilterType(type) {
    if (type < 255 / 3) {
      this.filter.type = 'lowpass'
    } else if (type < (2 * 255) / 3) {
      this.filter.type = 'highpass'
    } else {
      this.filter.type = 'bandpass'
    }
  }

  fxFilterFrequency(frequency, time) {
    this.filter.frequency.setValueAtTime(
      110 + (2 * 2 * 2 * 440 * frequency) / 255,
      time,
    )
  }

  fxQ(q, time) {
    this.filter.Q.setValueAtTime((10 * q) / 255, time)
  }

  fxGain(gain, time) {
    this.gain.gain.setValueAtTime((2 * gain) / 255, time)
  }
}
