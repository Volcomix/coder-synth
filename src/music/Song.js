import Simple from './instruments/Simple'

const audioContext = new AudioContext()

export default class Song {
  tempo = 168
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Simple(audioContext),
      notes: `
      G-4 --- --- --- --- ---
      C-4 --- --- --- --- ---
      D#4 F-4 G-4 --- --- ---
      C-4 --- --- --- D#4 F-4
      D-4 --- --- --- --- ---
      OFF --- --- --- --- ---
      --- --- --- --- --- ---
      --- --- --- --- --- ---
      `,
    },
  ]

  play() {
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    const notesPerMinute = this.notesPerBeat * this.tempo
    const secondsPerNote = 60.0 / notesPerMinute
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
