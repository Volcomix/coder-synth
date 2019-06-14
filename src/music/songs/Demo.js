import Song from '../common/Song'
import Oscillator from '../instruments/demo/Oscillator'
import Gain from '../instruments/demo/Gain'

export default class Demo extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Oscillator(this.audioContext),
      notes: 'C-4',
    },
    {
      instrument: new Gain(this.audioContext),
      notes: 'C-4',
    },
  ]
}
