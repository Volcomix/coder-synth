import noteFrequencies from './noteFrequencies'

export default class Instrument {
  /**
   * @param {AudioContext} audioContext
   */
  constructor(audioContext) {
    this.audioContext = audioContext
  }

  play(notes, timePerNote) {
    this.start()
    this.noteOff(0)
    let noteTime = this.audioContext.currentTime
    for (let noteName of notes) {
      if (noteName === 'OFF') {
        this.noteOff(noteTime)
      } else if (noteName !== '---') {
        this.noteOn(noteFrequencies[noteName], noteTime)
      }
      noteTime += timePerNote
    }
  }
}
