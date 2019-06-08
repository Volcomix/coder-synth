<template>
  <v-btn
    v-if="isPlaying"
    fab
    dark
    small
    color="error"
    class="elevation-2"
    @click="stop"
  >
    <v-icon dark>stop</v-icon>
  </v-btn>
  <v-btn
    v-else
    fab
    dark
    small
    color="primary"
    class="elevation-6"
    @click="play"
  >
    <v-icon dark>play_arrow</v-icon>
  </v-btn>
</template>

<script>
import Workshop1906 from '../music/songs/Workshop1906'

export default {
  data() {
    return {
      isPlaying: false,
      song: null,
    }
  },
  methods: {
    play() {
      if (!this.song) {
        this.song = new Workshop1906(new AudioContext())
      }
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

<style scoped></style>
