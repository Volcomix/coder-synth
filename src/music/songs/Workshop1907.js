import Song from '../common/Song'
import StringMachines from '../instruments/demo/StringMachines'

export default class Workshop1907 extends Song {
  tempo = 140
  notesPerBeat = 2
  tracks = [
    {
      instrument: new StringMachines(this.audioContext, this.destination),
      notes: `
        C-5 OFF E-5 OFF F-5 OFF G-5 ---
        --- --- --- --- --- --- --- OFF
      `,
      effects: {
        volume: `
        128 --- --- --- --- --- --- ---
        --- --- --- --- --- --- --- ---
        `,
      },
    },
  ]
}
