<template>
  <div>
    <VToolbar dark color="primary">
      <VToolbarSideIcon @click="drawer = !drawer" />
      <VToolbarTitle class="white--text">{{ songName }}</VToolbarTitle>
      <VBtn v-if="song" icon @click="stop">
        <VIcon color="error">stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>play_arrow</VIcon>
      </VBtn>
    </VToolbar>
    <VNavigationDrawer v-model="drawer" absolute temporary>
      <VToolbar flat>
        <VList>
          <VListTile>
            <VListTileContent>
              <VListTileTitle class="title">Songs</VListTileTitle>
            </VListTileContent>
          </VListTile>
        </VList>
      </VToolbar>
      <VDivider />
      <VList>
        <VListTile
          v-for="(Song, songName) in songs"
          :key="songName"
          :to="{ name: 'song', params: { songName } }"
        >
          <VListTileContent>
            <VListTileTitle>{{ songName }}</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
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
