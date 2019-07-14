import Song from '../common/Song'
import YourInstrument from '../instruments/demo/Oscillator'

export default class Workshop1907 extends Song {
  tempo = 140
  notesPerBeat = 2
  tracks = {
    YourTrackName: {
      instrument: new YourInstrument(),
    },
  }
}
