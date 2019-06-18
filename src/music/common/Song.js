export default class Song {
  constructor(audioContext, destination, track) {
    this.audioContext = audioContext
    this.destination = destination
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
    const notes = this.parseCommands(track.notes)
    const effects =
      track.effects &&
      Object.entries(track.effects).reduce(
        (result, [effectName, effectValues]) =>
          Object.assign(result, {
            [effectName]: this.parseCommands(effectValues),
          }),
        {},
      )
    track.instrument.play(notes, effects, timePerNote)
  }

  stopTrack(track) {
    track.instrument.stop()
  }

  parseCommands(commands) {
    return commands.trim().split(/\s+/)
  }
}
