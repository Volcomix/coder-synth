class DelayProcessor extends AudioWorkletProcessor {
  M = Math.round(44100 / 8)
  D = Array.from({ length: this.M }, () => 0)
  ptr = 0

  process(inputs, outputs) {
    const input = inputs[0]
    const output = outputs[0]

    const inputChannel = input[0]
    const outputChannel = output[0]

    for (let i = 0; i < inputChannel.length; i++) {
      const y = this.D[this.ptr]
      this.D[this.ptr++] = inputChannel[i]
      if (this.ptr >= this.M) {
        this.ptr -= this.M
      }
      outputChannel[i] = y
    }

    return true
  }
}

registerProcessor('delay-processor', DelayProcessor)
