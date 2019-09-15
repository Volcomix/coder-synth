import Song from '../common/Song'
import MetalSinger from '../instruments/metal-singer/MetalSinger'
import KarplusStrong from '../instruments/metal-singer/KarplusStrong'

export default class MetalSingerSong extends Song {
  tempo = 120
  notesPerBeat = 2
  tracks = {
    MetalSinger: {
      instrument: new MetalSinger(),
    },
    KarplusStrong: {
      instrument: new KarplusStrong(),
      notes: Array.from(
        { length: 500 },
        () => `
        C-4 --- --- --- C-4 --- --- ---
      `,
      ).join(''),
    },
  }
}
