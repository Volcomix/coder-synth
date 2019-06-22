import Song from '../common/Song'
import Oscillator from '../instruments/demo/Oscillator'
import Gain from '../instruments/demo/Gain'
import noteFrequencies from '../common/noteFrequencies'

export default class Demo extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Oscillator(this.audioContext, this.destination),
      notes: 'C-4',
    },
    {
      instrument: new Gain(this.audioContext, this.destination),
      notes: Object.keys(noteFrequencies)[47],
      effects: {
        detune: (79).toString(16),
      },
    },
  ]
}
