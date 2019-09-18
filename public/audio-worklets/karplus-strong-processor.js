class KarplusStrongProcessor extends AudioWorkletProcessor {
  N = 4096
  A = Array.from({ length: this.N }, () => 0)
  rptr = this.N - Math.round(44100 / 220)
  wptr = 0

  process(inputs, outputs) {
    const input = inputs[0]
    const output = outputs[0]

    const inputChannel = input[0]
    const outputChannel = output[0]

    for (let i = 0; i < inputChannel.length; i++) {
      const x = inputChannel[i]
      const y = x + (this.A[(this.rptr || this.N) - 1] + this.A[this.rptr]) / 2
      this.A[this.wptr++] = y
      this.rptr++
      if (this.wptr >= this.N) {
        this.wptr -= this.N
      }
      if (this.rptr >= this.N) {
        this.rptr -= this.N
      }
      outputChannel[i] = y
    }

    return true
  }
}

registerProcessor('karplus-strong-processor', KarplusStrongProcessor)
