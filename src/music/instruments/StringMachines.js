import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  start() {
    this.oscillator1 = this.audioContext.createOscillator()
    this.oscillator1.type = 'sawtooth'

    this.oscillator2 = this.audioContext.createOscillator()
    this.oscillator2.type = 'sawtooth'
    this.oscillator2.detune.value = -4

    this.vibratoSpeed = this.audioContext.createOscillator()
    this.vibratoSpeed.type = 'triangle'
    this.vibratoSpeed.frequency.value = 3

    this.vibratoDepth = this.audioContext.createGain()
    this.vibratoDepth.gain.value = 2

    this.gain1 = this.audioContext.createGain()
    this.gain1.gain.value = 0.5

    this.gain2 = this.audioContext.createGain()
    this.gain2.gain.value = 0.5

    this.lpf = this.audioContext.createBiquadFilter()
    this.lpf.type = 'lowpass'
    this.lpf.frequency.value = Object.values(noteFrequencies)[90]
    this.lpf.Q.value = (100 * 45) / 255

    this.envelope = this.audioContext.createGain()
    this.envelope.gain.value = 0

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.vibratoSpeed.connect(this.vibratoDepth)
    this.vibratoDepth.connect(this.oscillator1.frequency)
    this.oscillator1.connect(this.gain1)
    this.oscillator2.connect(this.gain2)
    this.gain1.connect(this.lpf)
    this.gain2.connect(this.lpf)
    this.lpf.connect(this.envelope)
    this.envelope.connect(this.volume)
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
    this.envelope.gain.cancelAndHoldAtTime(time)
    this.envelope.gain.linearRampToValueAtTime(1, time + 0.1)
  }

  noteOff(time) {
    this.envelope.gain.cancelAndHoldAtTime(time)
    this.envelope.gain.linearRampToValueAtTime(0, time + 0.15)
  }

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.oscillator1.frequency.setValueAtTime(frequency, time)
      this.oscillator2.frequency.setValueAtTime(frequency, time)
    }
  }

  fxDetune(detune, time) {
    this.oscillator2.detune.setValueAtTime(detune - 128, time)
  }

  fxVibratoSpeed(speed, time) {
    this.vibratoSpeed.frequency.setValueAtTime(speed, time)
  }

  fxVibratoDepth(depth, time) {
    this.vibratoDepth.gain.setValueAtTime(depth, time)
  }

  fxLpfPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.lpf.frequency.setValueAtTime(frequency, time)
    }
  }

  fxLpfQ(Q, time) {
    this.lpf.Q.setValueAtTime((100 * Q) / 255, time)
  }

  fxVolume(volume, time) {
    this.volume.gain.linearRampToValueAtTime(volume / 255, time)
  }
}
