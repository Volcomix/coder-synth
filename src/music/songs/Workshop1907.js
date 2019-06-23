import Song from '../common/Song'
import StringMachines from '../instruments/StringMachines'

export default class Workshop1907 extends Song {
  tempo = 168
  notesPerBeat = 2
  tracks = [
    {
      instrument: new StringMachines(this.audioContext, this.destination),
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
      effects: {
        volume: `
        128 --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- 128
        255 --- --- --- --- ---
        064 --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        `,
      },
    },
  ]
}
