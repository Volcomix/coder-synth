import noteFrequencies from './noteFrequencies'

export default class Instrument {
  /**
   * @param {AudioContext} audioContext
   */
  constructor(audioContext) {
    this.audioContext = audioContext
  }

  play(notes, effects, timePerNote) {
    this.start()
    this.noteOff(0)
    let noteTime = this.audioContext.currentTime
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      const noteName = notes[noteIndex]
      if (noteName === 'OFF') {
        this.noteOff(noteTime)
      } else if (noteName !== '---') {
        this.noteOn(noteFrequencies[noteName], noteTime)
      }
      if (effects) {
        this.playEffects(effects, noteIndex, noteTime)
      }
      noteTime += timePerNote
    }
  }

  playEffects(effects, noteIndex, noteTime) {
    Object.entries(effects).forEach(([effectName, effectValues]) => {
      const effectValue = effectValues[noteIndex]
      if (effectValue !== '--') {
        this.setEffect(effectName, parseInt(effectValue, 16), noteTime)
      }
    })
  }

  setEffect(effectName, effectValue, time = 0) {
    const fxMethod = `fx${effectName[0].toUpperCase()}${effectName.slice(1)}`
    this[fxMethod](effectValue, time)
  }
}
