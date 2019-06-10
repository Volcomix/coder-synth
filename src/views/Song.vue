<template>
  <div>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        {{ $route.params.songName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
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
    }
  },
  computed: {
    songs() {
      return songs
    },
    song() {
      return songs[this.$route.params.songName]
    },
  },
}
</script>
