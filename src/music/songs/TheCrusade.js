import Song from '../common/Song'
import Guitar from '../instruments/experiments/Guitar'

export default class TheCrusade extends Song {
  tempo = 135
  notesPerBeat = 4
  tracks = {
    Guitar: {
      instrument: new Guitar(),
      notes:
        '--- --- --- ---  --- --- --- ---' +
        Array.from(
          { length: 100 },
          () => `
          E-3 E-2 E-2 E-3  E-2 E-2 E-3 E-2  E-2 E-2 D-3 E-2
          F-3 E-2 E-3 E-2  C-3 E-2 D-3 E-2  E-3 E-2 B-2 E-2  C-3 E-2 D-3 E-2
          E-3 E-2 E-2 E-3  E-2 E-2 E-3 E-2  E-2 E-2 D-3 E-2
          F-3 E-2 E-3 E-2  A-3 E-2 G#3 E-2  F-3 E-2 G#3 E-2  E-3 E-2 F-3 E-2
          G#2 --- --- ---
      `,
        ).join(' '),
    },
  }
}
