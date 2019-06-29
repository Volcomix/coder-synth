import Instrument from '../common/Instrument'
import noteFrequencies from '../common/noteFrequencies'

export default class StringMachines extends Instrument {
  pulseCurve = Float32Array.from({ length: 256 }, (_, i) => (i < 128 ? -1 : 1))

  start() {
    this.key = this.audioContext.createConstantSource()

    this.osc = this.audioContext.createOscillator()
    this.osc.type = 'sawtooth'
    this.osc.frequency.value = 0

    this.oscDetuned = this.audioContext.createOscillator()
    this.oscDetuned.type = 'sawtooth'
    this.oscDetuned.frequency.value = 0
    this.oscDetuned.detune.value = -4

    this.pulseWidth = this.audioContext.createConstantSource()
    this.pulseWidth.offset.value = 0.275

    this.lfo = this.audioContext.createOscillator()
    this.lfo.type = 'triangle'
    this.lfo.frequency.value = 6

    this.oscMod = this.audioContext.createGain()
    this.oscMod.gain.value = 4

    this.pwmMod = this.audioContext.createGain()
    this.pwmMod.gain.value = 0.45

    this.pulse = this.audioContext.createWaveShaper()
    this.pulse.curve = this.pulseCurve

    this.pulseDetuned = this.audioContext.createWaveShaper()
    this.pulseDetuned.curve = this.pulseCurve

    this.lpf = this.audioContext.createBiquadFilter()
    this.lpf.type = 'lowpass'
    this.lpf.frequency.value = (8000 * 80) / 255
    this.lpf.Q.value = (50 * 15) / 255

    this.lpfKeyFollow = this.audioContext.createGain()
    this.lpfKeyFollow.gain.value = (10 * 110) / 255

    this.envelope = this.audioContext.createGain()
    this.envelope.gain.value = 0

    this.volume = this.audioContext.createGain()
    this.volume.gain.value = 1

    this.key.connect(this.osc.frequency)
    this.key.connect(this.oscDetuned.frequency)

    this.lfo.connect(this.pwmMod)
    this.pwmMod.connect(this.pulseWidth.offset)

    this.lfo.connect(this.oscMod)
    this.oscMod.connect(this.osc.frequency)

    this.osc.connect(this.pulse)
    this.pulseWidth.connect(this.pulse)

    this.oscDetuned.connect(this.pulseDetuned)
    this.pulseWidth.connect(this.pulseDetuned)

    this.osc.connect(this.lpf)
    this.pulse.connect(this.lpf)
    this.oscDetuned.connect(this.lpf)
    this.pulseDetuned.connect(this.lpf)

    this.key.connect(this.lpfKeyFollow)
    this.lpfKeyFollow.connect(this.lpf.frequency)

    this.lpf.connect(this.envelope)
    this.envelope.connect(this.volume)
    this.volume.connect(this.destination)

    this.key.start()
    this.osc.start()
    this.oscDetuned.start()
    this.pulseWidth.start()
    this.lfo.start()
  }

  stop() {
    this.key.stop()
    this.osc.stop()
    this.oscDetuned.stop()
    this.pulseWidth.stop()
    this.lfo.stop()
  }

  noteOn(noteFrequency, time) {
    this.key.offset.setValueAtTime(noteFrequency, time)
    this.envelope.gain.setTargetAtTime(0, time - 0.05, 0.05)
    this.envelope.gain.setTargetAtTime(0.25, time, 0.3)
  }

  noteOff(time) {
    this.envelope.gain.setTargetAtTime(0, time, 0.5)
  }

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency !== undefined) {
      this.key.offset.setValueAtTime(frequency, time)
    }
  }

  fxDetune(detune, time) {
    this.oscDetuned.detune.setValueAtTime(detune - 128, time)
  }

  fxPulseWidth(width, time) {
    this.pulseWidth.offset.setValueAtTime((2 * width) / 255 - 1, time)
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

  fxLpfFreq(frequency, time) {
    this.lpf.frequency.setValueAtTime((8000 * frequency) / 255, time)
  }

  fxLpfQ(Q, time) {
    this.lpf.Q.setValueAtTime((50 * Q) / 255, time)
  }

  fxLpfKeyFollow(amount, time) {
    this.lpfKeyFollow.gain.setValueAtTime((10 * amount) / 255, time)
  }

  fxVolume(volume, time) {
    this.volume.gain.linearRampToValueAtTime(volume / 255, time)
  }
}
