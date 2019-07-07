import Instrument from '../../common/Instrument'
import noteFrequencies from '../../common/noteFrequencies'

export default class Formant extends Instrument {
  vowels = ['a', 'e', 'i', 'u', 'o']
  singerType = 'soprano'
  formantCount = 5

  start() {
    this.oscillator = this.audioContext.createOscillator()
    this.oscillator.type = 'sawtooth'

    this.volume = this.audioContext.createGain()

    this.formants = Array.from({ length: this.formantCount }, () => {
      const bpf = this.audioContext.createBiquadFilter()
      bpf.type = 'bandpass'

      const vca = this.audioContext.createGain()

      this.oscillator.connect(bpf)
      bpf.connect(vca)
      vca.connect(this.volume)

      return { bpf, vca }
    })

    this.volume.connect(this.destination)

    this.oscillator.start()
  }

  stop() {
    this.oscillator.stop()
  }

  noteOn(frequency, time) {
    this.oscillator.frequency.setValueAtTime(frequency, time)
  }

  fxPitch(pitch, time) {
    const frequency = Object.values(noteFrequencies)[pitch]
    if (frequency) {
      this.oscillator.frequency.setValueAtTime(frequency, time)
    }
  }

  fxVolume(gain, time) {
    this.volume.gain.setValueAtTime((10 * gain) / 255, time)
  }

  fxVowel(vowel, time) {
    const i = vowel === 255 ? 3.99999 : (4 * vowel) / 255
    const vowelIndex = Math.floor(i)
    const offset = i - vowelIndex
    const vowel1Name = this.vowels[vowelIndex]
    const vowel2Name = this.vowels[vowelIndex + 1]
    const vowel1 = formantTable[`${this.singerType} "${vowel1Name}"`]
    const vowel2 = formantTable[`${this.singerType} "${vowel2Name}"`]
    for (let i = 0; i < this.formantCount; i++) {
      const freq1 = vowel1.freq[i]
      const freq2 = vowel2.freq[i]
      const freq = freq1 + offset * (freq2 - freq1)
      this.formants[i].bpf.frequency.setValueAtTime(freq, time)

      const bw1 = vowel1.bw[i]
      const bw2 = vowel2.bw[i]
      const bw = bw1 + offset * (bw2 - bw1)
      const q = freq / bw
      this.formants[i].bpf.Q.setValueAtTime(q, time)

      const amp1 = vowel1.amp[i]
      const amp2 = vowel1.amp[i]
      const amp = amp1 + offset * (amp2 - amp1)
      const gain = Math.pow(10, amp / 20)
      this.formants[i].vca.gain.setValueAtTime(gain, time)
    }
  }
}

// Got from here: https://www.classes.cs.uchicago.edu/archive/1999/spring/CS295/Computing_Resources/Csound/CsManual3.48b1.HTML/Appendices/table3.html
//
// To extract as JavaScript object:
// const rows = $$('table[frame="above"] tr:not(:first-of-type)')
// console.log(JSON.stringify(Array.from({length: rows.length / 4}, (_, i) => [$('td', rows[i * 4]).innerText.trim(), {
//   freq: $$('td:not(:first-of-type)', rows[i * 4 + 1]).map(node => parseInt(node.innerText.trim())),
//   amp: $$('td:not(:first-of-type)', rows[i * 4 + 2]).map(node => parseInt(node.innerText.trim())),
//   bw: $$('td:not(:first-of-type)', rows[i * 4 + 3]).map(node => parseInt(node.innerText.trim()))
// }]).reduce((result, [vowel, formants]) => Object.assign(result, {[vowel]: formants}), {})))
const formantTable = {
  'soprano "a"': {
    freq: [800, 1150, 2900, 3900, 4950],
    amp: [0, -6, -32, -20, -50],
    bw: [80, 90, 120, 130, 140],
  },
  'soprano "e"': {
    freq: [350, 2000, 2800, 3600, 4950],
    amp: [0, -20, -15, -40, -56],
    bw: [60, 100, 120, 150, 200],
  },
  'soprano "i"': {
    freq: [270, 2140, 2950, 3900, 4950],
    amp: [0, -12, -26, -26, -44],
    bw: [60, 90, 100, 120, 120],
  },
  'soprano "o"': {
    freq: [450, 800, 2830, 3800, 4950],
    amp: [0, -11, -22, -22, -50],
    bw: [70, 80, 100, 130, 135],
  },
  'soprano "u"': {
    freq: [325, 700, 2700, 3800, 4950],
    amp: [0, -16, -35, -40, -60],
    bw: [50, 60, 170, 180, 200],
  },
  'alto "a"': {
    freq: [800, 1150, 2800, 3500, 4950],
    amp: [0, -4, -20, -36, -60],
    bw: [80, 90, 120, 130, 140],
  },
  'alto "e"': {
    freq: [400, 1600, 2700, 3300, 4950],
    amp: [0, -24, -30, -35, -60],
    bw: [60, 80, 120, 150, 200],
  },
  'alto "i"': {
    freq: [350, 1700, 2700, 3700, 4950],
    amp: [0, -20, -30, -36, -60],
    bw: [50, 100, 120, 150, 200],
  },
  'alto "o"': {
    freq: [450, 800, 2830, 3500, 4950],
    amp: [0, -9, -16, -28, -55],
    bw: [70, 80, 100, 130, 135],
  },
  'alto "u"': {
    freq: [325, 700, 2530, 3500, 4950],
    amp: [0, -12, -30, -40, -64],
    bw: [50, 60, 170, 180, 200],
  },
  'countertenor "a"': {
    freq: [660, 1120, 2750, 3000, 3350],
    amp: [0, -6, -23, -24, -38],
    bw: [80, 90, 120, 130, 140],
  },
  'countertenor "e"': {
    freq: [440, 1800, 2700, 3000, 3300],
    amp: [0, -14, -18, -20, -20],
    bw: [70, 80, 100, 120, 120],
  },
  'countertenor "i"': {
    freq: [270, 1850, 2900, 3350, 3590],
    amp: [0, -24, -24, -36, -36],
    bw: [40, 90, 100, 120, 120],
  },
  'countertenor "o"': {
    freq: [430, 820, 2700, 3000, 3300],
    amp: [0, -10, -26, -22, -34],
    bw: [40, 80, 100, 120, 120],
  },
  'countertenor "u"': {
    freq: [370, 630, 2750, 3000, 3400],
    amp: [0, -20, -23, -30, -34],
    bw: [40, 60, 100, 120, 120],
  },
  'tenor "a"': {
    freq: [650, 1080, 2650, 2900, 3250],
    amp: [0, -6, -7, -8, -22],
    bw: [80, 90, 120, 130, 140],
  },
  'tenor "e"': {
    freq: [400, 1700, 2600, 3200, 3580],
    amp: [0, -14, -12, -14, -20],
    bw: [70, 80, 100, 120, 120],
  },
  'tenor "i"': {
    freq: [290, 1870, 2800, 3250, 3540],
    amp: [0, -15, -18, -20, -30],
    bw: [40, 90, 100, 120, 120],
  },
  'tenor "o"': {
    freq: [400, 800, 2600, 2800, 3000],
    amp: [0, -10, -12, -12, -26],
    bw: [40, 80, 100, 120, 120],
  },
  'tenor "u"': {
    freq: [350, 600, 2700, 2900, 3300],
    amp: [0, -20, -17, -14, -26],
    bw: [40, 60, 100, 120, 120],
  },
  'bass "a"': {
    freq: [600, 1040, 2250, 2450, 2750],
    amp: [0, -7, -9, -9, -20],
    bw: [60, 70, 110, 120, 130],
  },
  'bass "e"': {
    freq: [400, 1620, 2400, 2800, 3100],
    amp: [0, -12, -9, -12, -18],
    bw: [40, 80, 100, 120, 120],
  },
  'bass "i"': {
    freq: [250, 1750, 2600, 3050, 3340],
    amp: [0, -30, -16, -22, -28],
    bw: [60, 90, 100, 120, 120],
  },
  'bass "o"': {
    freq: [400, 750, 2400, 2600, 2900],
    amp: [0, -11, -21, -20, -40],
    bw: [40, 80, 100, 120, 120],
  },
  'bass "u"': {
    freq: [350, 600, 2400, 2675, 2950],
    amp: [0, -20, -32, -28, -36],
    bw: [40, 80, 100, 120, 120],
  },
}
