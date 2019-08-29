<template>
  <VApp>
    <SongsDrawer v-model="drawer" />
    <VAppBar app dark color="secondary">
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VToolbarTitle class="white--text mr-2">{{ songName }}</VToolbarTitle>
      <VBtn v-if="isPlaying" icon @click="stop">
        <VIcon color="primary">stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>play_arrow</VIcon>
      </VBtn>
      <VSpacer />
      <TracksMenu :song="song" :track-name="trackName" />
    </VAppBar>
    <VContent>
      <VContainer
        class="fill-height pa-0 d-flex flex-column align-stretch"
        fluid
      >
        <Oscilloscope :key="`${songName}-${trackName}`" :analyser="analyser" />
        <TrackEffects
          v-if="instrument"
          :instrument="instrument"
          :is-playing="isPlaying"
        />
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import SongsDrawer from '../components/SongsDrawer'
import TracksMenu from '../components/TracksMenu'
import TrackEffects from '../components/TrackEffects'
import Oscilloscope from '../components/Oscilloscope'
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
      drawer: null,
      audioContext: null,
      analyser: null,
      song: null,
      isPlaying: false,
    }
  },
  computed: {
    songs() {
      return songs
    },
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
    play() {
      if (!this.audioContext) {
        this.createAudioContext()
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
  },
}
</script>
