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
    this.noiseGain.gain.value = 0.75

    this.noiseMod = this.audioContext.createGain()
    this.noiseMod.gain.value = 600

    this.osc = this.audioContext.createOscillator()
    this.osc.type = 'sawtooth'
    this.osc.frequency.value = noteFrequencies['C#4']

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

    this.mixer = this.audioContext.createGain()
    this.mixer.gain.value = this.mixerToGain(215)

    this.noise.connect(this.noiseGain)

    this.noise.connect(this.noiseMod)
    this.noiseMod.connect(this.osc.frequency)

    this.noiseGain.connect(this.f1Filter)
    this.osc.connect(this.f1Filter)
    this.f1Filter.connect(this.f1Gain)
    this.f1Gain.connect(this.mixer)

    this.noiseGain.connect(this.f2Filter)
    this.osc.connect(this.f2Filter)
    this.f2Filter.connect(this.f2Gain)
    this.f2Gain.connect(this.mixer)

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

  fxOscType(type) {
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

  fxNoiseGain(gain, time) {
    this.noiseGain.gain.setValueAtTime(gain / 255, time)
  }

  fxMod(mod, time) {
    this.noiseMod.gain.setValueAtTime(10 * mod, time)
  }

  fxF1Freq(freq, time) {
    this.f1Freq = 10 * freq
    this.f1Filter.frequency.setValueAtTime(this.f1Freq, time)
  }

  fxF1Bw(bw, time) {
    this.f1Filter.Q.setValueAtTime(this.bwToQ(bw, this.f1Freq), time)
  }

  fxF1Amp(amp, time) {
    this.f1Gain.gain.setValueAtTime(this.ampToGain(-amp), time)
  }

  fxF2Freq(freq, time) {
    this.f2Freq = 10 * freq
    this.f2Filter.frequency.setValueAtTime(this.f2Freq, time)
  }

  fxF2Bw(bw, time) {
    this.f2Filter.Q.setValueAtTime(this.bwToQ(bw, this.f2Freq), time)
  }

  fxF2Amp(amp, time) {
    this.f2Gain.gain.setValueAtTime(this.ampToGain(-amp), time)
  }

  fxMixer(mixer, time) {
    this.mixer.gain.setValueAtTime(this.mixerToGain(mixer), time)
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
