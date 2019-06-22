<template>
  <VApp>
    <SongsDrawer v-model="drawer" />
    <VToolbar dark color="primary">
      <VToolbarSideIcon @click="drawer = !drawer" />
      <VToolbarTitle class="white--text">{{ songName }}</VToolbarTitle>
      <VBtn v-if="isPlaying" icon @click="stop">
        <VIcon color="error">stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>play_arrow</VIcon>
      </VBtn>
      <VSpacer />
      <TracksMenu :song="song" :track="track" />
    </VToolbar>
    <VContent>
      <VLayout fill-height column>
        <TrackEffects
          v-if="instrument"
          :instrument="instrument"
          :isPlaying="isPlaying"
        />
        <Oscilloscope :key="`${songName}-${track}`" :analyser="analyser" />
      </VLayout>
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
    track() {
      if (this.$route.params.track == null) {
        return null
      } else {
        return this.$route.params.track - 1
      }
    },
    instrument() {
      if (this.track == null) {
        return null
      } else {
        return this.song.tracks[this.track].instrument
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
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.analyser.connect(this.audioContext.destination)
    this.createSong()
  },
  methods: {
    createSong() {
      this.song = new songs[this.songName](
        this.audioContext,
        this.analyser,
        this.track,
      )
    },
    play() {
      this.song.play()
      this.isPlaying = true
    },
    stop() {
      this.song.stop()
      this.isPlaying = false
    },
  },
}
</script>
