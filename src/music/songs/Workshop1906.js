import Song from '../common/Song'
import Simple from '../instruments/Simple'

export default class Workshop1906 extends Song {
  tempo = 168
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Simple(this.audioContext),
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
}
