import Song from '../common/Song'
import StringMachines from '../instruments/StringMachines'

export default class Workshop1907 extends Song {
  tempo = 168
  notesPerBeat = 2
  tracks = [
    {
      instrument: new StringMachines(this.audioContext, this.destination),
      notes: `
        G-5 --- C-5 --- D#5 F-5
        G-5 --- C-5 --- D#5 F-5
        G-5 --- C-5 --- D#5 F-5
        G-5 --- C-5 --- D#5 F-5

        G-5 --- C-5 --- E-5 F-5
        G-5 --- C-5 --- E-5 F-5
        G-5 --- C-5 --- E-5 F-5
        G-5 --- C-5 --- E-5 F-5

        G-5 --- --- --- --- ---
        C-5 --- --- --- --- ---
        D#5 F-5 G-5 --- --- ---
        C-5 --- --- --- D#5 F-5

        D-5 --- G-4 --- A#4 C-5
        D-5 --- G-4 --- A#4 C-5
        D-5 --- G-4 --- A#4 C-5
        D-5 --- G-4 --- A#4 ---

        F-5 --- --- --- --- ---
        A#4 --- --- --- --- ---
        D#5 D-5 F-5 --- --- ---
        A#4 --- --- --- D#5 D-5

        C-5 --- --- --- --- ---
        --- --- --- --- --- ---
        OFF --- --- --- --- ---
        --- --- --- --- --- ---
      `,
      effects: {
        volume: `
        128 --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        128 200 128 --- --- ---
        128 200 128 --- --- ---
        128 200 128 --- --- ---
        128 200 128 --- --- ---

        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        128 200 128 --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        `,
      },
    },
  ]
}
