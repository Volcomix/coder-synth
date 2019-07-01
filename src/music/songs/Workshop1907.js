import Song from '../common/Song'
import Oscillator from '../instruments/demo/Oscillator'

export default class Workshop1907 extends Song {
  tempo = 140
  notesPerBeat = 2
  tracks = [
    {
      instrument: new Oscillator(this.audioContext, this.destination),
    },
  ]
}
