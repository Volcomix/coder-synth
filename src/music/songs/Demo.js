import Song from '../common/Song'
import StringMachines from '../instruments/demo/StringMachines'
import Oscillator from '../instruments/demo/Oscillator'

export default class Demo extends Song {
  tempo = 168
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Oscillator(this.audioContext, this.destination),
    },
    {
      instrument: new Oscillator(this.audioContext, this.destination),
      notes: `
        C-4 --- E-4 --- F#4 --- G-4 ---
        --- --- --- --- --- --- --- OFF
      `,
    },
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
        008 --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---
        --- --- --- --- --- ---

        128 --- --- --- --- ---
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
