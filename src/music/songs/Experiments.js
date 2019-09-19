import Song from '../common/Song'
import Subtractive from '../instruments/experiments/Subtractive'
import Envelope from '../instruments/experiments/Envelope'
import Formant from '../instruments/experiments/Formant'
import Speech from '../instruments/experiments/Speech'
import Scream from '../instruments/experiments/Scream'
import Feedback from '../instruments/experiments/Feedback'
import Pwm from '../instruments/experiments/Pwm'
import MetalSinger from '../instruments/experiments/MetalSinger'
import KarplusStrong from '../instruments/experiments/KarplusStrong'
import AudioWorkletInstrument from '../instruments/experiments/AudioWorkletInstrument'
import KarplusStrongWorklet from '../instruments/experiments/KarplusStrongWorklet'

export default class Experiments extends Song {
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
    PWM: {
      instrument: new Pwm(),
    },
    MetalSinger: {
      instrument: new MetalSinger(),
    },
    KarplusStrong: {
      instrument: new KarplusStrong(),
      notes: Array.from({ length: 500 }, () => `A-3 --- --- ---`).join(' '),
    },
    KarplusStrongWorklet: {
      instrument: new KarplusStrongWorklet(),
      notes: Array.from({ length: 500 }, () => `A-3 --- A-4 ---`).join(' '),
    },
    AudioWorklet: {
      instrument: new AudioWorkletInstrument(),
      notes: Array.from({ length: 1 }, () => `C-4 OFF`).join(' '),
    },
  }
}
