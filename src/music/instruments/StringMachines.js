import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  start() {
    this.oscillator1 = this.audioContext.createOscillator()
    this.oscillator1.type = 'sawtooth'

    this.gain1 = this.audioContext.createGain()

    this.oscillator2 = this.audioContext.createOscillator()
    this.oscillator2.type = 'sawtooth'
    this.oscillator2.detune.value = 5

    this.gain2 = this.audioContext.createGain()

    this.vibrato = this.audioContext.createOscillator()
    this.vibrato.type = 'triangle'
    this.vibrato.frequency.value = 4

    this.vibratoGain = this.audioContext.createGain()
    this.vibratoGain.gain.value = 6

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.vibrato.connect(this.vibratoGain)
    this.vibratoGain.connect(this.oscillator1.frequency)
    this.oscillator1.connect(this.gain1)
    this.oscillator2.connect(this.gain2)
    this.gain1.connect(this.volume)
    this.gain2.connect(this.volume)
    this.volume.connect(this.destination)

    this.oscillator1.start()
    this.oscillator2.start()
    this.vibrato.start()
  }

  stop() {
    this.oscillator1.stop()
    this.oscillator2.stop()
    this.vibrato.stop()
  }

  noteOn(noteFrequency, time) {
    this.oscillator1.frequency.setValueAtTime(noteFrequency, time)
    this.oscillator2.frequency.setValueAtTime(noteFrequency, time)
    this.gain1.gain.setValueAtTime(0.5, time)
    this.gain2.gain.setValueAtTime(0.5, time)
  }

  noteOff(time) {
    this.gain1.gain.setValueAtTime(0, time)
    this.gain2.gain.setValueAtTime(0, time)
  }

  fxPitch1(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.oscillator1.frequency.setValueAtTime(frequency, time)
    }
  }

  fxPitch2(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.oscillator2.frequency.setValueAtTime(frequency, time)
    }
  }

  fxDetune2(detune, time) {
    this.oscillator2.detune.setValueAtTime(detune, time)
  }

  fxGain1(gain, time) {
    this.gain1.gain.setValueAtTime((2 * gain) / 255, time)
  }

  fxGain2(gain, time) {
    this.gain2.gain.setValueAtTime((2 * gain) / 255, time)
  }

  fxVibratoSpeed(speed, time) {
    this.vibrato.frequency.setValueAtTime(speed, time)
  }

  fxVibratoGain(gain, time) {
    this.vibratoGain.gain.setValueAtTime(gain, time)
  }

  fxVolume(volume, time) {
    this.volume.gain.setValueAtTime(volume / 255, time)
  }
}
