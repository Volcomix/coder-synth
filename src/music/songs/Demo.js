import Song from '../common/Song'
import StringMachines from '../instruments/demo/StringMachines'
import Oscillator from '../instruments/demo/Oscillator'
import Amplitude from '../instruments/demo/Amplitude'
import Envelope from '../instruments/demo/Envelope'
import Lfo from '../instruments/demo/Lfo'
import Fm from '../instruments/demo/Fm'
import Additive from '../instruments/demo/Additive'
import Subtractive from '../instruments/demo/Subtractive'

export default class Demo extends Song {
  tempo = 168
  notesPerBeat = 2
  tracks = {
    Oscillator: {
      instrument: new Oscillator(),
    },
    Notes: {
      instrument: new Oscillator(),
      notes: `
        C-4 --- E-4 --- F#4 --- G-4 ---
        --- --- --- --- --- --- --- OFF
      `,
    },
    Amplitude: {
      instrument: new Amplitude(),
    },
    Effects: {
      instrument: new Amplitude(),
      notes: `
        C-4 --- E-4 --- F#4 --- G-4 ---
        --- --- --- --- --- --- --- OFF
      `,
      effects: {
        gain: `
        064 --- --- --- --- --- 255 ---
        --- --- --- --- --- --- --- 000
        `,
      },
    },
    Envelope: {
      instrument: new Envelope(),
      notes: Array.from(
        { length: 80 },
        () => `
        C-4 --- --- --- --- --- --- ---
        --- --- --- --- OFF --- --- ---
        `,
      ).join(' '),
    },
    LFO: {
      instrument: new Lfo(),
    },
    FM: {
      instrument: new Fm(),
    },
    Additive: {
      instrument: new Additive(),
    },
    Subtractive: {
      instrument: new Subtractive(),
    },
    Example: {
      instrument: new StringMachines(),
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
  }
}
