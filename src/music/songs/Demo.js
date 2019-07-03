import Song from '../common/Song'
import StringMachines from '../instruments/demo/StringMachines'
import Oscillator from '../instruments/demo/Oscillator'
import Amplitude from '../instruments/demo/Amplitude'
import Envelope from '../instruments/demo/Envelope'
import Lfo from '../instruments/demo/Lfo'
import Fm from '../instruments/demo/Fm'
import Additive from '../instruments/demo/Additive'

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
      instrument: new Amplitude(this.audioContext, this.destination),
    },
    {
      instrument: new Amplitude(this.audioContext, this.destination),
      notes: `
        C-4 --- E-4 --- F#4 --- G-4 ---
        --- --- --- --- --- --- --- OFF
      `,
      effects: {
        gain: `
        056 --- --- --- --- --- 255 ---
        --- --- --- --- --- --- --- 000
        `,
      },
    },
    {
      instrument: new Envelope(this.audioContext, this.destination),
      notes: Array.from(
        { length: 80 },
        () => `
        C-4 --- --- --- --- --- --- ---
        --- --- --- --- OFF --- --- ---
        `,
      ).join(' '),
    },
    {
      instrument: new Lfo(this.audioContext, this.destination),
    },
    {
      instrument: new Fm(this.audioContext, this.destination),
    },
    {
      instrument: new Additive(this.audioContext, this.destination),
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
