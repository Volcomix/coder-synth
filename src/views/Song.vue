<template>
  <VApp>
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
    <VToolbar dark color="primary">
      <VToolbarSideIcon @click="drawer = !drawer" />
      <VToolbarTitle class="white--text">{{ songName }}</VToolbarTitle>
      <VBtn v-if="song" icon @click="stop">
        <VIcon color="error">stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>play_arrow</VIcon>
      </VBtn>
      <VSpacer />
      <VMenu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <VToolbarTitle v-on="on">
            <span>{{ instrumentName }}</span>
            <VIcon dark>arrow_drop_down</VIcon>
          </VToolbarTitle>
        </template>
        <VList>
          <VListTile
            v-for="(Instrument, instrumentName) in instruments"
            :key="instrumentName"
            :to="{ name: 'instrument', params: { instrumentName } }"
          >
            <VListTileTitle>{{ instrumentName }}</VListTileTitle>
          </VListTile>
        </VList>
      </VMenu>
    </VToolbar>
    <VContent>
      <RouterView />
    </VContent>
  </VApp>
</template>

<script>
import songs from '../music/songs'
import instruments from '../music/instruments'

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
    instruments() {
      return instruments
    },
    instrumentName() {
      return this.$route.params.instrumentName
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
