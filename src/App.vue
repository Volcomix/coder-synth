<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import songs from './music/songs'

export default {
  data() {
    return {
      audioContext: null,
      songName: Object.keys(songs)[0],
    }
  },
  computed: {
    songs() {
      return songs
    },
  },
  methods: {
    play(Song) {
      if (this.playingSong) {
        this.playingSong.stop()
      }
      if (this.isPlaying(Song)) {
        this.playingSong = null
        return
      }
      if (!this.audioContext) {
        this.audioContext = new AudioContext()
      }
      this.playingSong = new Song(this.audioContext)
      this.playingSong.play()
    },

    isPlaying(Song) {
      return this.playingSong instanceof Song
    },
  },
}
</script>
