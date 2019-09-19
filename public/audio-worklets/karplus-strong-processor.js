class KarplusStrongProcessor extends AudioWorkletProcessor {
  N = 4096
  A = Array.from({ length: this.N }, () => 0)
  wptr = 0

  static get parameterDescriptors() {
    return [
      {
        name: 'frequency',
        defaultValue: 1,
        minValue: 1,
        automationRate: 'a-rate',
      },
    ]
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0]
    const output = outputs[0]

    const inputChannel = input[0]
    const outputChannel = output[0]

    for (let i = 0; i < inputChannel.length; i++) {
      const frequency =
        parameters['frequency'].length > 1
          ? parameters['frequency'][i]
          : parameters['frequency'][0]
      let rptr = this.wptr - Math.round(sampleRate / frequency)
      while (rptr < 0) {
        rptr += this.N
      }
      const x = inputChannel[i]
      const y = x + (this.A[(rptr || this.N) - 1] + this.A[rptr]) / 2
      this.A[this.wptr++] = y
      if (this.wptr >= this.N) {
        this.wptr -= this.N
      }
      outputChannel[i] = y
    }

    return true
  }
}

registerProcessor('karplus-strong-processor', KarplusStrongProcessor)
