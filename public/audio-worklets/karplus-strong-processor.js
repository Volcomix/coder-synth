class KarplusStrongProcessor extends AudioWorkletProcessor {
  N = 4096
  A = Array.from({ length: this.N }, () => 0)
  wptr = 0
  x1 = 0
  x2 = 0

  static get parameterDescriptors() {
    return [
      {
        name: 'frequency',
        defaultValue: 1,
        minValue: 1,
        maxValue: 0.5 * sampleRate,
        automationRate: 'a-rate',
      },
      {
        name: 'decayTimeT60',
        defaultValue: 4,
        minValue: 0,
        maxValue: 10,
        automationRate: 'a-rate',
      },
      {
        name: 'brightness',
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
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
      const t60 =
        parameters['decayTimeT60'].length > 1
          ? parameters['decayTimeT60'][i]
          : parameters['decayTimeT60'][0]
      const B =
        parameters['brightness'].length > 1
          ? parameters['brightness'][i]
          : parameters['brightness'][0]

      let x = inputChannel[i]

      let rptr = this.wptr - Math.round(sampleRate / frequency)
      while (rptr < 0) {
        rptr += this.N
      }
      x = x + (this.A[(rptr || this.N) - 1] + this.A[rptr]) / 2

      const rho = 0.001 ** (1 / (frequency * t60))
      const h0 = (1 + B) / 2
      const h1 = (1 - B) / 4
      const y = rho * (h0 * this.x1 + h1 * (x + this.x2))
      this.x2 = this.x1
      this.x1 = x

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
