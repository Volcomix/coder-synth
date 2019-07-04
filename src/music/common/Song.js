export default class Song {
  constructor(audioContext, destination, trackName) {
    this.audioContext = audioContext
    this.destination = destination
    this.trackName = trackName
  }

  play() {
    const notesPerMinute = this.notesPerBeat * this.tempo
    const secondsPerNote = 60 / notesPerMinute
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(track =>
        this.playTrack(track, secondsPerNote),
      )
    } else {
      this.playTrack(this.tracks[this.trackName], secondsPerNote)
    }
  }

  stop() {
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(this.stopTrack)
    } else {
      this.stopTrack(this.tracks[this.trackName])
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
    return commands ? commands.trim().split(/\s+/) : []
  }
}
