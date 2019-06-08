<template>
  <v-app>
    <v-card>
      <v-list>
        <v-list-tile
          v-for="(Song, songName) in songs"
          :key="songName"
          ripple
          @click="play(Song)"
        >
          <v-list-tile-action>
            <v-icon v-if="isPlaying(Song)" color="teal">play_arrow</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="songName"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import songs from './music/songs'

export default {
  data() {
    return {
      audioContext: null,
      playingSong: null,
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
