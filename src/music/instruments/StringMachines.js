import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  randomCurve = Float32Array.from({ length: 256 }, () => Math.random() * 2 - 1)
  pulseCurve = Float32Array.from({ length: 256 }, (_, i) => (i < 128 ? -1 : 1))
  oneCurve = new Float32Array([1, 1])

  start() {
    this.lfo = this.audioContext.createOscillator()
    this.lfo.type = 'triangle'
    this.lfo.frequency.value = 4

    this.osc = this.audioContext.createOscillator()
    this.osc.type = 'sawtooth'

    this.oscDetuned = this.audioContext.createOscillator()
    this.oscDetuned.type = 'sawtooth'
    this.oscDetuned.detune.value = -4

    this.one = this.audioContext.createWaveShaper()
    this.one.curve = this.oneCurve

    this.pulse = this.audioContext.createWaveShaper()
    this.pulse.curve = this.pulseCurve

    this.pulseDetuned = this.audioContext.createWaveShaper()
    this.pulseDetuned.curve = this.pulseCurve

    this.oscMod = this.audioContext.createGain()
    this.oscMod.gain.value = 4

    this.pwmMod = this.audioContext.createGain()
    this.pwmMod.gain.value = 0.3

    this.pulseWidth = this.audioContext.createGain()
    this.pulseWidth.gain.value = 0.5

    this.gain1 = this.audioContext.createGain()
    this.gain1.gain.value = 0.25

    this.gain2 = this.audioContext.createGain()
    this.gain2.gain.value = 0.25

    this.gain3 = this.audioContext.createGain()
    this.gain3.gain.value = 0.25

    this.gain4 = this.audioContext.createGain()
    this.gain4.gain.value = 0.25

    // this.vibratoShaper = this.audioContext.createWaveShaper()
    // this.vibratoShaper.curve = this.random

    this.lpf = this.audioContext.createBiquadFilter()
    this.lpf.type = 'lowpass'
    this.lpf.frequency.value = Object.values(noteFrequencies)[96]
    this.lpf.Q.value = (100 * 15) / 255

    this.envelope = this.audioContext.createGain()
    this.envelope.gain.value = 0

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.osc.connect(this.one)
    this.one.connect(this.pulseWidth)
    this.lfo.connect(this.pwmMod)
    this.pwmMod.connect(this.pulseWidth)

    this.lfo.connect(this.oscMod)
    this.oscMod.connect(this.osc.frequency)

    this.osc.connect(this.pulse)
    this.pulseWidth.connect(this.pulse)

    this.oscDetuned.connect(this.pulseDetuned)
    this.pulseWidth.connect(this.pulseDetuned)

    this.pulse.connect(this.gain1)
    this.osc.connect(this.gain2)
    this.pulseDetuned.connect(this.gain3)
    this.oscDetuned.connect(this.gain4)

    this.gain1.connect(this.lpf)
    this.gain2.connect(this.lpf)
    this.gain3.connect(this.lpf)
    this.gain4.connect(this.lpf)

    this.lpf.connect(this.envelope)
    this.envelope.connect(this.volume)
    this.volume.connect(this.destination)

    this.lfo.start()
    this.osc.start()
    this.oscDetuned.start()
  }

  stop() {
    this.lfo.stop()
    this.osc.stop()
    this.oscDetuned.stop()
  }

  noteOn(noteFrequency, time) {
    this.osc.frequency.setValueAtTime(noteFrequency, time)
    this.oscDetuned.frequency.setValueAtTime(noteFrequency, time)
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
      this.osc.frequency.setValueAtTime(frequency, time)
      this.oscDetuned.frequency.setValueAtTime(frequency, time)
    }
  }

  fxDetune(detune, time) {
    this.oscDetuned.detune.setValueAtTime(detune - 128, time)
  }

  fxLfoRate(rate, time) {
    this.lfo.frequency.setValueAtTime(rate, time)
  }

  fxOscMod(mod, time) {
    this.oscMod.gain.setValueAtTime(mod, time)
  }

  fxPwmMod(mod, time) {
    this.pwmMod.gain.setValueAtTime(mod / 255, time)
  }

  fxPulseWidth(width, time) {
    this.pulseWidth.gain.setValueAtTime(width / 255, time)
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
