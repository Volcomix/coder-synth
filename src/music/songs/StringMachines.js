import Song from '../common/Song'
import StringMachines from '../instruments/StringMachines'

export default class Demo extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = [
    {
      instrument: new StringMachines(this.audioContext, this.destination),
      notes: 'C-4',
    },
  ]
}
