export default class Song {
  constructor(audioContext) {
    this.audioContext = audioContext
  }

  play() {
    const notesPerMinute = this.notesPerBeat * this.tempo
    const secondsPerNote = 60 / notesPerMinute
    for (let track of this.tracks) {
      const notes = track.notes.trim().split(/\s+/)
      track.instrument.play(notes, secondsPerNote)
    }
  }

  stop() {
    for (let track of this.tracks) {
      track.instrument.stop()
    }
  }
}
