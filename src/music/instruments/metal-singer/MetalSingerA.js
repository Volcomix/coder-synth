import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class MetalSingerA extends Instrument {
  start() {
    const noiseLength = 2
    const bufferSize = this.audioContext.sampleRate * noiseLength
    const buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate,
    )
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    this.noise = this.audioContext.createBufferSource()
    this.noise.buffer = buffer
    this.noise.loop = true

    this.noiseGain = this.audioContext.createGain()
    this.noiseGain.gain.value = 0.12

    this.noiseMod = this.audioContext.createGain()
    this.noiseMod.gain.value = 0

    this.osc = this.audioContext.createOscillator()
    this.osc.type = 'sawtooth'
    this.osc.frequency.value = noteFrequencies['F-3']

    this.f1Filter = this.audioContext.createBiquadFilter()
    this.f1Filter.type = 'bandpass'
    this.f1Filter.frequency.value = this.f1Freq = 750
    this.f1Filter.Q.value = this.bwToQ(80, this.f1Freq)

    this.f1Gain = this.audioContext.createGain()
    this.f1Gain.gain.value = this.ampToGain(0)

    this.f2Filter = this.audioContext.createBiquadFilter()
    this.f2Filter.type = 'bandpass'
    this.f2Filter.frequency.value = this.f2Freq = 1150
    this.f2Filter.Q.value = this.bwToQ(90, this.f2Freq)

    this.f2Gain = this.audioContext.createGain()
    this.f2Gain.gain.value = this.ampToGain(-4)

    this.distortion = this.audioContext.createWaveShaper()
    this.distortion.curve = this.makeDistortionCurve(400)

    this.mixer = this.audioContext.createGain()
    this.mixer.gain.value = this.mixerToGain(64)

    this.noise.connect(this.noiseGain)

    this.noise.connect(this.noiseMod)
    this.noiseMod.connect(this.osc.frequency)

    this.noiseGain.connect(this.f1Filter)
    this.osc.connect(this.f1Filter)
    this.f1Filter.connect(this.f1Gain)
    this.f1Gain.connect(this.distortion)

    this.noiseGain.connect(this.f2Filter)
    this.osc.connect(this.f2Filter)
    this.f2Filter.connect(this.f2Gain)
    this.f2Gain.connect(this.distortion)

    this.distortion.connect(this.mixer)

    this.mixer.connect(this.destination)

    this.noise.start()
    this.osc.start()
  }

  stop() {
    this.noise.stop()
    this.osc.stop()
  }

  fxOscPitch(pitch, time) {
    const freq = Object.values(noteFrequencies)[pitch]
    if (freq) {
      this.osc.frequency.setValueAtTime(freq, time)
    }
  }

  xfxOscType(type) {
    if (type < 64) {
      this.osc.type = 'sine'
    } else if (type < 128) {
      this.osc.type = 'square'
    } else if (type < 192) {
      this.osc.type = 'sawtooth'
    } else {
      this.osc.type = 'triangle'
    }
  }

  xfxNoiseGain(gain, time) {
    this.noiseGain.gain.setValueAtTime(gain / 255, time)
  }

  fxScream(mod, time) {
    this.noiseMod.gain.setValueAtTime(10 * mod, time)
  }

  xfxScream(amount, time) {
    const gain = 64 + (140 * amount) / 255
    const mod = amount
    this.noiseGain.gain.setValueAtTime(gain / 255, time)
    this.noiseMod.gain.setValueAtTime(10 * mod, time)
  }

  xfxF1Freq(freq, time) {
    this.f1Freq = 10 * freq
    this.f1Filter.frequency.setValueAtTime(this.f1Freq, time)
  }

  xfxF1Bw(bw, time) {
    this.f1Filter.Q.setValueAtTime(this.bwToQ(bw, this.f1Freq), time)
  }

  xfxF1Amp(amp, time) {
    this.f1Gain.gain.setValueAtTime(this.ampToGain(-amp), time)
  }

  xfxF2Freq(freq, time) {
    this.f2Freq = 10 * freq
    this.f2Filter.frequency.setValueAtTime(this.f2Freq, time)
  }

  xfxF2Bw(bw, time) {
    this.f2Filter.Q.setValueAtTime(this.bwToQ(bw, this.f2Freq), time)
  }

  xfxF2Amp(amp, time) {
    this.f2Gain.gain.setValueAtTime(this.ampToGain(-amp), time)
  }

  xfxDistortion(amount) {
    this.distortion.curve = this.makeDistortionCurve(10 * amount)
  }

  xfxMixer(mixer, time) {
    this.mixer.gain.setValueAtTime(this.mixerToGain(mixer), time)
  }

  makeDistortionCurve(amount) {
    const k = amount
    const n_samples = 44100
    const curve = new Float32Array(n_samples)
    const deg = Math.PI / 180
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
    }
    return curve
  }

  mixerToGain(mixer) {
    return (10 * mixer) / 255
  }

  bwToQ(bw, freq) {
    return freq / bw
  }

  ampToGain(amp) {
    return Math.pow(10, amp / 20)
  }
}
