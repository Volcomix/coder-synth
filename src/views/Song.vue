<template>
  <VApp>
    <SongsDrawer v-model="drawer" />
    <VAppBar app dark color="secondary">
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VToolbarTitle class="white--text mr-2">{{ songName }}</VToolbarTitle>
      <VBtn v-if="isPlaying" icon @click="stop">
        <VIcon color="primary">mdi-stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>mdi-play</VIcon>
      </VBtn>
      <VSpacer />
      <VToolbarItems>
        <TracksMenu :song="song" :track-name="trackName" />
      </VToolbarItems>
    </VAppBar>
    <VContent>
      <div class="fill-height d-flex flex-column">
        <Oscilloscope :key="`${songName}-${trackName}`" :analyser="analyser" />
        <TrackEffects
          v-if="instrument"
          :instrument="instrument"
          :is-playing="isPlaying"
        />
      </div>
    </VContent>
  </VApp>
</template>

<script>
import SongsDrawer from '../components/SongsDrawer'
import TracksMenu from '../components/TracksMenu'
import TrackEffects from '../components/TrackEffects'
import Oscilloscope from '../components/Oscilloscope'
import audioWorklets from '../music/common/audioWorklets'
import songs from '../music/songs'

export default {
  components: {
    SongsDrawer,
    TracksMenu,
    TrackEffects,
    Oscilloscope,
  },
  data() {
    return {
      songs,
      publicPath: process.env.BASE_URL,
      drawer: null,
      audioContext: null,
      analyser: null,
      song: null,
      isPlaying: false,
    }
  },
  computed: {
    songName() {
      return this.$route.params.songName
    },
    trackName() {
      return this.$route.params.trackName
    },
    instrument() {
      if (this.trackName) {
        return this.song.tracks[this.trackName].instrument
      } else {
        return null
      }
    },
  },
  watch: {
    $route() {
      if (this.isPlaying) {
        this.stop()
      }
      this.createSong()
    },
  },
  created() {
    this.createSong()
  },
  methods: {
    createSong() {
      this.song = new songs[this.songName](this.trackName)
    },
    async play() {
      if (!this.audioContext) {
        this.createAudioContext()
        await this.initAudioWorklets()
      }
      this.song.play(this.audioContext, this.analyser)
      this.isPlaying = true
    },
    stop() {
      this.song.stop()
      this.isPlaying = false
    },
    createAudioContext() {
      this.audioContext = new AudioContext()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 2048
      this.analyser.connect(this.audioContext.destination)
    },
    async initAudioWorklets() {
      if (!this.audioContext.audioWorklet) {
        // eslint-disable-next-line no-console
        console.warn('AudioWorklets are not supported by your browser!')
        return
      }
      await Promise.all(
        Object.values(audioWorklets).map(async audioWorklet => {
          await this.audioContext.audioWorklet.addModule(
            `${this.publicPath}audio-worklets/${audioWorklet}.js`,
          )
        }),
      )
    },
  },
}
</script>
