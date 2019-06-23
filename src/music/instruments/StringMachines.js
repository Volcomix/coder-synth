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

    this.vibratoSpeed = this.audioContext.createOscillator()
    this.vibratoSpeed.type = 'triangle'
    this.vibratoSpeed.frequency.value = 4.08

    this.vibratoDepth = this.audioContext.createGain()
    this.vibratoDepth.gain.value = 2.74

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.vibratoSpeed.connect(this.vibratoDepth)
    this.vibratoDepth.connect(this.oscillator1.frequency)
    this.oscillator1.connect(this.gain1)
    this.oscillator2.connect(this.gain2)
    this.gain1.connect(this.volume)
    this.gain2.connect(this.volume)
    this.volume.connect(this.destination)

    this.oscillator1.start()
    this.oscillator2.start()
    this.vibratoSpeed.start()
  }

  stop() {
    this.oscillator1.stop()
    this.oscillator2.stop()
    this.vibratoSpeed.stop()
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

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.oscillator1.frequency.setValueAtTime(frequency, time)
      this.oscillator2.frequency.setValueAtTime(frequency, time)
    }
  }

  fxDetune(detune, time) {
    this.oscillator2.detune.setValueAtTime(detune, time)
  }

  fxVibratoSpeed(speed, time) {
    this.vibratoSpeed.frequency.setValueAtTime((20 * speed) / 255, time)
  }

  fxVibratoDepth(depth, time) {
    this.vibratoDepth.gain.setValueAtTime((50 * depth) / 255, time)
  }

  fxVolume(volume, time) {
    this.volume.gain.setValueAtTime(volume / 255, time)
  }
}
