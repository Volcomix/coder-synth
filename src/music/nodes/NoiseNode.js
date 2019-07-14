export default class NoiseNode extends AudioBufferSourceNode {
  /**
   * @param {AudioContext} context
   */
  constructor(context, noiseLength = 2) {
    super(context)
    const bufferSize = context.sampleRate * noiseLength
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    this.buffer = buffer
  }
}
