<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ songName }}</v-toolbar-title>
      <v-btn v-if="song" icon @click="stop">
        <v-icon color="error">stop</v-icon>
      </v-btn>
      <v-btn v-else icon @click="play">
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="title">Songs</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          v-for="(Song, songName) in songs"
          :key="songName"
          :to="{ name: 'song', params: { songName } }"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ songName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import songs from '../music/songs'

export default {
  data() {
    return {
      drawer: null,
      audioContext: null,
      song: null,
    }
  },
  computed: {
    songs() {
      return songs
    },
    songName() {
      return this.$route.params.songName
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (this.song) {
      this.stop()
    }
    next()
  },
  methods: {
    play() {
      if (!this.audioContext) {
        this.audioContext = new AudioContext()
      }
      this.song = new songs[this.songName](this.audioContext)
      this.song.play()
    },
    stop() {
      this.song.stop()
      this.song = null
    },
  },
}
</script>
