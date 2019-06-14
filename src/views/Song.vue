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
      <Instrument />
    </VContent>
  </VApp>
</template>

<script>
import SongsDrawer from '../components/SongsDrawer'
import TracksMenu from '../components/TracksMenu'
import Instrument from '../components/Instrument'
import songs from '../music/songs'

export default {
  components: {
    SongsDrawer,
    TracksMenu,
    Instrument,
  },
  data() {
    return {
      drawer: null,
      audioContext: null,
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
  },
  created() {
    this.audioContext = new AudioContext()
    this.createSong()
  },
  watch: {
    $route() {
      if (this.isPlaying) {
        this.stop()
      }
      this.createSong()
    },
  },
  methods: {
    createSong() {
      this.song = new songs[this.songName](this.audioContext, this.track)
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
