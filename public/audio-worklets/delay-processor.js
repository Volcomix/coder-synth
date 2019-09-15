class DelayProcessor extends AudioWorkletProcessor {
  N = 4096
  A = Array.from({ length: this.N }, () => 0)
  rptr = 4096 - Math.round(44100 / 220) + 128
  wptr = 0

  static get parameterDescriptors() {
    return [
      {
        name: 'delaySamples',
        defaultValue: 1,
        minValue: 1,
        maxValue: 4096,
        automationRate: 'a-rate',
      },
    ]
  }

  process(inputs, outputs) {
    const input = inputs[0]
    const output = outputs[0]

    const inputChannel = input[0]
    const outputChannel = output[0]

    for (let i = 0; i < inputChannel.length; i++) {
      this.A[this.wptr++] = inputChannel[i]
      const y = this.A[this.rptr++]
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

registerProcessor('delay-processor', DelayProcessor)
