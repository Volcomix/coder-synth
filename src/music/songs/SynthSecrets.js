import Song from '../common/Song'
import Subtractive from '../instruments/synth-secrets/Subtractive'
import Envelope from '../instruments/synth-secrets/Envelope'
import Formant from '../instruments/synth-secrets/Formant'
import Speech from '../instruments/synth-secrets/Speech'
import Scream from '../instruments/synth-secrets/Scream'
import Feedback from '../instruments/synth-secrets/Feedback'

export default class SynthSecrets extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = {
    Subtractive: {
      instrument: new Subtractive(),
    },
    Envelope: {
      instrument: new Envelope(),
      notes: `
        OFF C-4 E-4 F-4 G-4 --- --- ---
        OFF C-4 E-4 F-4 G-4 --- --- ---
        OFF C-4 E-4 F-4 G-4 --- E-4 ---
        C-4 --- E-4 --- D-4 --- --- ---

        OFF E-4 E-4 D-4 C-4 --- --- ---
        E-4 --- G-4 --- G-4 F-4 --- ---
        OFF --- E-4 F-4 G-4 --- E-4 ---
        C-4 --- D-4 --- C-4 --- --- ---
        OFF
      `,
    },
    Formant: {
      instrument: new Formant(),
      notes: 'F-3',
      effects: {
        vowel: '0',
        volume: '64',
      },
    },
    Speech: {
      instrument: new Speech(),
      notes: `
        E-2 F-2 G-2 A-2 --- F-2 G-2 OFF
        A-2 --- G-2 F-2 --- --- OFF ---
        F-2 --- D-2 C-2 E-2 OFF --- ---
      `,
      effects: {
        volume: '64',
        stop: `
        --- --- --- 000 --- 001 001 ---
        --- --- 003 002 --- --- --- ---
        --- --- 003 --- 003 --- --- ---
        `,
        vowel: `
        255 000 064 128 --- 032 128 ---
        255 --- 255 128 --- --- --- ---
        000 --- 192 128 192 --- --- ---
        `,
        diphthong1: `
        000 255 192 --- --- 064 --- ---
        --- --- --- --- --- --- --- ---
        255 --- --- 192 --- --- --- ---
        `,
        diphthong2: `
        128 --- --- 016 --- --- --- ---
        016 --- --- --- --- --- --- ---
        --- --- --- --- --- --- --- ---
        `,
      },
    },
    Scream: {
      instrument: new Scream(),
    },
    Feedback: {
      instrument: new Feedback(),
    },
  }
}
