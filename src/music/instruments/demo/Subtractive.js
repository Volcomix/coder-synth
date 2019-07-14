import Instrument from '../../common/Instrument'

export default class Subtractive extends Instrument {
  /**
   * @param {AudioContext} audioContext
   * @param {AudioDestinationNode} destination
   */
  start(audioContext, destination) {
    const bufferSize = audioContext.sampleRate * 60
    const sampleRate = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    this.noise = audioContext.createBufferSource()
    this.noise.buffer = buffer

    this.filter = audioContext.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 440
    this.filter.Q.value = 20

    this.noise.connect(this.filter)
    this.filter.connect(destination)

    this.noise.start()
  }

  stop() {
    this.noise.stop()
  }

  fxFilterFrequency(frequency, time) {
    this.filter.frequency.setValueAtTime(110 + (880 * frequency) / 255, time)
  }

  fxFilterQ(q, time) {
    this.filter.Q.setValueAtTime((200 * q) / 255, time)
  }

  fxFilterType(type) {
    if (type < 256 / 3) {
      this.filter.type = 'lowpass'
    } else if (type < (2 * 256) / 3) {
      this.filter.type = 'highpass'
    } else {
      this.filter.type = 'bandpass'
    }
  }
}
