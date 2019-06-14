export default class Song {
  constructor(audioContext, track) {
    this.audioContext = audioContext
    this.track = track
  }

  play() {
    const notesPerMinute = this.notesPerBeat * this.tempo
    const secondsPerNote = 60 / notesPerMinute
    if (this.track == null) {
      this.tracks.forEach(track => this.playTrack(track, secondsPerNote))
    } else {
      this.playTrack(this.tracks[this.track], secondsPerNote)
    }
  }

  stop() {
    if (this.track == null) {
      this.tracks.forEach(this.stopTrack)
    } else {
      this.stopTrack(this.tracks[this.track])
    }
  }

  playTrack(track, timePerNote) {
    const notes = track.notes.trim().split(/\s+/)
    track.instrument.play(notes, timePerNote)
  }

  stopTrack(track) {
    track.instrument.stop()
  }
}
