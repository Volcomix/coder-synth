export default class Song {
  constructor(trackName) {
    this.trackName = trackName
  }

  play(audioContext, destination) {
    const startTime = audioContext.currentTime + 1
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(track =>
        this.playTrack(track, startTime, audioContext, destination),
      )
    } else {
      this.playTrack(
        this.tracks[this.trackName],
        startTime,
        audioContext,
        destination,
      )
    }
  }

  stop() {
    if (this.trackName == null) {
      Object.values(this.tracks).forEach(this.stopTrack)
    } else {
      this.stopTrack(this.tracks[this.trackName])
    }
  }

  playTrack(track, startTime, audioContext, destination) {
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
    track.instrument.start(audioContext, destination)
    track.instrument.play(notes, effects, secondsPerNote, startTime)
  }

  stopTrack(track) {
    track.instrument.stop()
  }

  parseCommands(commands) {
    return commands ? commands.trim().split(/\s+/) : []
  }
}
