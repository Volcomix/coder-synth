import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'
import PulseNode from '../../nodes/PulseNode'

export default class Pwm extends Instrument {
  /**
   * @param {AudioContext} context
   * @param {AudioDestinationNode} destination
   */
  start(context, destination) {
    this.pulse = new PulseNode(context)
    this.pulse.frequency.value = Object.values(noteFrequencies)[28]
    this.pulse.detune.value = 77

    this.lfo = context.createOscillator()
    this.lfo.type = 'triangle'
    this.lfo.frequency.value = 0

    this.lfoGain = context.createGain()
    this.lfoGain.gain.value = 0

    this.lfo.connect(this.lfoGain)
    this.lfoGain.connect(this.pulse.width)
    this.pulse.connect(destination)

    this.pulse.start()
    this.lfo.start()
  }

  stop() {
    this.pulse.stop()
    this.lfo.stop()
  }

  fxPitch(pitch, time) {
    const freq = Object.values(noteFrequencies)[pitch]
    if (freq) {
      this.pulse.frequency.setValueAtTime(freq, time)
    }
  }

  fxDetune(detune, time) {
    this.pulse.detune.setValueAtTime(detune, time)
  }

  fxWidth(offset, time) {
    this.pulse.width.setValueAtTime(1 - (2 * offset) / 255, time)
  }

  fxLfoRate(freq, time) {
    this.lfo.frequency.setValueAtTime(freq, time)
  }

  fxLfoDepth(gain, time) {
    this.lfoGain.gain.setValueAtTime(gain / 255, time)
  }
}
