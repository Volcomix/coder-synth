import Song from '../common/Song'
import Subtractive from '../instruments/synth-secrets/Subtractive'
import Envelope from '../instruments/synth-secrets/Envelope'
import Formant from '../instruments/synth-secrets/Formant'
import Speech from '../instruments/synth-secrets/Speech'

export default class SynthSecrets extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = {
    Subtractive: {
      instrument: new Subtractive(this.audioContext, this.destination),
    },
    Envelope: {
      instrument: new Envelope(this.audioContext, this.destination),
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
      instrument: new Formant(this.audioContext, this.destination),
      notes: 'F-3',
      effects: {
        vowel: '0',
        volume: '64',
      },
    },
    Speech: {
      instrument: new Speech(this.audioContext, this.destination),
      notes: `---
        F-3 --- --- OFF F-3 --- OFF ---
      `,
      effects: {
        vowel: `---
        255 000 064 --- 064 --- --- ---
        `,
        diphthong1: `---
        000 255 192 --- 128 --- --- ---
        `,
        diphthong2: `---
        128 --- --- --- 016 --- --- ---
        `,
      },
    },
  }
}
