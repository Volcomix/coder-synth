export default class Song {
  constructor(trackName) {
    this.trackName = trackName
  }

  play(audioContext, destination) {
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(track =>
        this.playTrack(track, audioContext, destination),
      )
    } else {
      this.playTrack(this.tracks[this.trackName], audioContext, destination)
    }
  }

  stop() {
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(this.stopTrack)
    } else {
      this.stopTrack(this.tracks[this.trackName])
    }
  }

  playTrack(track, audioContext, destination) {
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
    const notesPerMinute = this.notesPerBeat * this.tempo
    const secondsPerNote = 60 / notesPerMinute
    track.instrument.play(
      notes,
      effects,
      secondsPerNote,
      audioContext,
      destination,
    )
  }

  stopTrack(track) {
    track.instrument.stop()
  }

  parseCommands(commands) {
    return commands ? commands.trim().split(/\s+/) : []
  }
}
