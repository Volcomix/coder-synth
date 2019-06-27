import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  random = Float32Array.from({ length: 256 }, () => Math.random() * 2 - 1)

  start() {
    this.osc1 = this.audioContext.createOscillator()
    this.osc1.type = 'sawtooth'

    this.osc2 = this.audioContext.createOscillator()
    this.osc2.type = 'sawtooth'
    this.osc2.detune.value = -4

    this.gain1 = this.audioContext.createGain()
    this.gain1.gain.value = 0.5

    this.gain2 = this.audioContext.createGain()
    this.gain2.gain.value = 0.5

    this.vibratoSpeed = this.audioContext.createOscillator()
    this.vibratoSpeed.type = 'sawtooth'
    this.vibratoSpeed.frequency.value = 20 / 255

    this.vibratoShaper = this.audioContext.createWaveShaper()
    this.vibratoShaper.curve = this.random

    this.vibratoDepth = this.audioContext.createGain()
    this.vibratoDepth.gain.value = 4

    this.lpf = this.audioContext.createBiquadFilter()
    this.lpf.type = 'lowpass'
    this.lpf.frequency.value = Object.values(noteFrequencies)[96]
    this.lpf.Q.value = (100 * 15) / 255

    this.envelope = this.audioContext.createGain()
    this.envelope.gain.value = 0

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.osc1.connect(this.gain1)
    this.osc2.connect(this.gain2)
    this.gain1.connect(this.lpf)
    this.gain2.connect(this.lpf)
    this.vibratoSpeed.connect(this.vibratoShaper)
    this.vibratoShaper.connect(this.vibratoDepth)
    this.vibratoDepth.connect(this.osc1.frequency)
    this.lpf.connect(this.envelope)
    this.envelope.connect(this.volume)
    this.volume.connect(this.destination)

    this.osc1.start()
    this.osc2.start()
    this.vibratoSpeed.start()
  }

  stop() {
    this.osc1.stop()
    this.osc2.stop()
    this.vibratoSpeed.stop()
  }

  noteOn(noteFrequency, time) {
    this.osc1.frequency.setValueAtTime(noteFrequency, time)
    this.osc2.frequency.setValueAtTime(noteFrequency, time)
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
      this.osc1.frequency.setValueAtTime(frequency, time)
      this.osc2.frequency.setValueAtTime(frequency, time)
    }
  }

  fxDetune(detune, time) {
    this.osc2.detune.setValueAtTime(detune - 128, time)
  }

  fxVibratoSpeed(speed, time) {
    this.vibratoSpeed.frequency.setValueAtTime(speed / 255, time)
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
