const noteNames = 'C C# D D# E F F# G G# A A# B'
  .split(' ')
  .map(noteName => (noteName.length === 1 ? `${noteName}-` : noteName))

const frequencies = Array.from(
  { length: 97 },
  (_, i) => 2 ** ((i - 57) / 12) * 440,
)

/**
 * An object mapping each note with its corresponding frequency,
 * from `C-0` to `C-8` both inclusive.
 *
 * @example
 * console.log(notes['A-4']) // Outputs 440
 * console.log(notes['C#2']) // Outputs 69.29565774421803
 */
const notes = frequencies.reduce((notes, frequency, i) => {
  const octave = Math.floor(i / 12)
  const noteName = noteNames[i % 12]
  return Object.assign(notes, { [`${noteName}${octave}`]: frequency })
}, {})

export default notes
