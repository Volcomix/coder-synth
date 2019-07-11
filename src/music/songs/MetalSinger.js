import Song from '../common/Song'
import MetalSingerA from '../instruments/metal-singer/MetalSingerA'

export default class MetalSinger extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = {
    MetalSingerA: {
      instrument: new MetalSingerA(this.audioContext, this.destination),
    },
  }
}
