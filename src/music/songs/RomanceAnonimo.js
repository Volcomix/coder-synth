import Song from '../common/Song'
import KarplusStrongWorklet from '../instruments/experiments/KarplusStrongWorklet'

// Jeux interdits
export default class RomanceAnonimo extends Song {
  tempo = 110
  notesPerBeat = 3
  tracks = {
    String1: {
      instrument: new KarplusStrongWorklet(),
      notes: Array.from(
        { length: 100 },
        () => `
          B-4 --- --- B-4 --- --- B-4 --- ---
          B-4 --- --- A-4 --- --- G-4 --- ---
          G-4 --- --- F#4 --- --- E-4 --- ---
          E-4 --- --- G-4 --- --- B-4 --- ---
          E-5 --- --- E-5 --- --- E-5 --- ---
          E-5 --- --- D-5 --- --- C-5 --- ---
          C-5 --- --- B-4 --- --- A-4 --- ---
          A-4 --- --- B-4 --- --- C-5 --- ---

          B-4 --- --- C-5 --- --- B-4 --- ---
          D#5 --- --- C-5 --- --- B-4 --- ---
          B-4 --- --- A-4 --- --- G-4 --- ---
          G-4 --- --- F#4 --- --- E-4 --- ---
          F#4 --- --- F#4 --- --- F#4 --- ---
          F#4 --- --- G-4 --- --- F#4 --- ---
          E-4 --- --- E-4 --- --- E-4 --- ---
          E-4 --- --- --- --- --- F#4 --- ---
        `,
      ).join(' '),
      effects: {
        gain: Array.from(
          { length: 100 },
          () => `
          055 --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---

          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- --- --- --- --- --- ---
          --- --- --- 040 --- --- 030 --- ---
          020 --- --- --- --- --- --- --- ---
        `,
        ).join(' '),
      },
    },
    String2: {
      instrument: new KarplusStrongWorklet(),
      notes: Array.from(
        { length: 100 },
        () => `
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- E-4 --- --- E-4 --- --- E-4 ---
          --- E-4 --- --- E-4 --- --- E-4 ---

          --- F#4 --- --- F#4 --- --- F#4 ---
          --- F#4 --- --- F#4 --- --- F#4 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- B-3 --- --- B-3 --- --- B-3 ---
          --- --- --- --- --- --- --- --- ---
        `,
      ).join(' '),
      effects: {
        gain: `025`,
      },
    },
    String3: {
      instrument: new KarplusStrongWorklet(),
      notes: Array.from(
        { length: 100 },
        () => `
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- C-4 --- --- C-4 --- --- C-4
          --- --- C-4 --- --- C-4 --- --- C-4

          --- --- D#4 --- --- D#4 --- --- D#4
          --- --- D#4 --- --- D#4 --- --- D#4
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- A-3 --- --- A-3 --- --- A-3
          --- --- A-3 --- --- A-3 --- --- A-3
          --- --- G-3 --- --- G-3 --- --- G-3
          --- --- --- --- --- --- --- --- ---
        `,
      ).join(' '),
      effects: {
        gain: `020`,
      },
    },
    String4: {
      instrument: new KarplusStrongWorklet(),
      notes: Array.from(
        { length: 100 },
        () => `
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          A-2 --- --- --- --- --- --- --- ---
          A-2 --- --- --- --- --- --- --- ---

          B-2 --- --- --- --- --- --- --- ---
          B-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          E-2 --- --- --- --- --- --- --- ---
          B-2 --- --- --- --- --- --- --- ---
          D#3 --- --- --- --- --- --- --- ---
          E-3 --- --- B-2 --- --- G-2 --- ---
          E-2 --- --- --- --- --- --- --- ---
        `,
      ).join(' '),
      effects: {
        gain: `020`,
      },
    },
  }
}
