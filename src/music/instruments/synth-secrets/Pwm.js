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

    this.pulse.connect(destination)

    this.pulse.start()
  }

  stop() {
    this.pulse.stop()
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
}
