import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  oneCurve = new Float32Array([1, 1])
  pulseCurve = Float32Array.from({ length: 256 }, (_, i) => (i < 128 ? -1 : 1))

  start() {
    this.lfo = this.audioContext.createOscillator()
    this.lfo.type = 'triangle'
    this.lfo.frequency.value = 6

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
    this.pwmMod.gain.value = 0.45

    this.pulseWidth = this.audioContext.createGain()
    this.pulseWidth.gain.value = 0.275

    this.lpf = this.audioContext.createBiquadFilter()
    this.lpf.type = 'lowpass'
    this.lpf.frequency.value = (8000 * 170) / 255
    this.lpf.Q.value = (50 * 32) / 255

    this.envelope = this.audioContext.createGain()
    this.envelope.gain.value = 0

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.osc.connect(this.one)
    this.one.connect(this.pulseWidth)
    this.lfo.connect(this.pwmMod)
    this.pwmMod.connect(this.pulseWidth.gain)

    this.lfo.connect(this.oscMod)
    this.oscMod.connect(this.osc.frequency)

    this.osc.connect(this.pulse)
    this.pulseWidth.connect(this.pulse)

    this.oscDetuned.connect(this.pulseDetuned)
    this.pulseWidth.connect(this.pulseDetuned)

    this.pulse.connect(this.lpf)
    this.osc.connect(this.lpf)
    this.pulseDetuned.connect(this.lpf)
    this.oscDetuned.connect(this.lpf)

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
    this.envelope.gain.linearRampToValueAtTime(0.25, time + 0.1)
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
    this.pulseWidth.gain.setValueAtTime((2 * width) / 255 - 1, time)
  }

  fxLpfFreq(frequency, time) {
    this.lpf.frequency.setValueAtTime((8000 * frequency) / 255, time)
  }

  fxLpfQ(Q, time) {
    this.lpf.Q.setValueAtTime((50 * Q) / 255, time)
  }

  fxVolume(volume, time) {
    this.volume.gain.linearRampToValueAtTime(volume / 255, time)
  }
}
