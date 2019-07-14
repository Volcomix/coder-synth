import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class MetalSinger extends Instrument {
  /**
   * @param {AudioContext} audioCtx
   * @param {AudioDestinationNode} destination
   */
  start(audioCtx, destination) {
    const noiseLength = 2
    const bufferSize = audioCtx.sampleRate * noiseLength
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    this.noise = audioCtx.createBufferSource()
    this.noise.buffer = buffer
    this.noise.loop = true

    this.noiseGain = audioCtx.createGain()
    this.noiseGain.gain.value = 0.12

    this.noiseMod = audioCtx.createGain()
    this.noiseMod.gain.value = 0

    this.osc = audioCtx.createOscillator()
    this.osc.type = 'sawtooth'
    this.osc.frequency.value = noteFrequencies['F-3']

    this.f1Filter = audioCtx.createBiquadFilter()
    this.f1Filter.type = 'bandpass'
    this.f1Filter.frequency.value = this.f1Freq = 750
    this.f1Filter.Q.value = this.bwToQ(80, this.f1Freq)

    this.f1Gain = audioCtx.createGain()
    this.f1Gain.gain.value = this.ampToGain(0)

    this.f2Filter = audioCtx.createBiquadFilter()
    this.f2Filter.type = 'bandpass'
    this.f2Filter.frequency.value = this.f2Freq = 1150
    this.f2Filter.Q.value = this.bwToQ(90, this.f2Freq)

    this.f2Gain = audioCtx.createGain()
    this.f2Gain.gain.value = this.ampToGain(-4)

    this.distortion = audioCtx.createWaveShaper()
    this.distortion.curve = this.makeDistortionCurve(400)

    this.filter = audioCtx.createBiquadFilter()
    this.filter.type = 'lowshelf'
    this.filter.frequency.value = 340
    this.filter.gain.value = 5

    this.mixer = audioCtx.createGain()
    this.mixer.gain.value = this.mixerToGain(50)

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

    this.distortion.connect(this.filter)
    this.filter.connect(this.mixer)

    this.mixer.connect(destination)

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

  xfxFilterFreq(freq, time) {
    this.filter.frequency.setValueAtTime(freq * 10, time)
  }

  xfxFilterGain(gain, time) {
    this.filter.gain.setValueAtTime(gain, time)
  }

  fxMixer(mixer, time) {
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
