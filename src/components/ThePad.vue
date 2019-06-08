<template>
  <div>
    The Pad
    <button v-if="isPlaying" @click="stop">Stop</button>
    <button v-else @click="play">Play</button>
  </div>
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
