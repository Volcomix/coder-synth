import notes from './notes'
import Simple from './instruments/Simple'

console.log(JSON.stringify(notes))

export default class Song {
  tracks = [
    {
      instrument: new Simple(),
      notes: `
      G-4 --- --- --- --- ---
      C-4 --- --- --- --- ---
      D#4 F-4 G-4 --- --- ---
      C-4 --- --- --- D#4 F-4
      D-4 --- --- --- --- ---
      OFF --- --- --- --- ---
      --- --- --- --- --- ---
      --- --- --- --- --- ---
      `,
    },
  ]
}
