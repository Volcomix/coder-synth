<template>
  <div>
    The Pad
    <button v-if="isPlaying" @click="stop">Stop</button>
    <button v-else @click="play">Play</button>
  </div>
</template>

<script>
import Song from '../music/Song'

export default {
  data() {
    return {
      isPlaying: false,
      song: new Song(),
    }
  },
  methods: {
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

<style scoped></style>
