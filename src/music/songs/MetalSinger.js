import Song from '../common/Song'
import MetalSinger from '../instruments/metal-singer/MetalSinger'

export default class MetalSingerSong extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = {
    MetalSinger: {
      instrument: new MetalSinger(),
    },
  }
}
