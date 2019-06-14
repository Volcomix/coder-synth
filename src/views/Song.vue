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
      <VBtn v-if="isPlaying" icon @click="stop">
        <VIcon color="error">stop</VIcon>
      </VBtn>
      <VBtn v-else icon @click="play">
        <VIcon>play_arrow</VIcon>
      </VBtn>
      <VSpacer />
      <VMenu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <VToolbarTitle v-on="on">
            <span v-if="track === null">All tracks</span>
            <span v-else> Track {{ track + 1 }} ({{ instrumentName }}) </span>
            <VIcon dark>arrow_drop_down</VIcon>
          </VToolbarTitle>
        </template>
        <VList>
          <VListTile :to="{ params: { track: null } }" exact>
            <VListTileTitle>
              All tracks
            </VListTileTitle>
          </VListTile>
          <VListTile
            v-for="(instrumentName, index) in instrumentNames"
            :key="instrumentName"
            :to="{ params: { track: index + 1 } }"
          >
            <VListTileTitle>
              Track {{ index + 1 }} ({{ instrumentName }})
            </VListTileTitle>
          </VListTile>
        </VList>
      </VMenu>
    </VToolbar>
    <VContent>
      <Instrument />
    </VContent>
  </VApp>
</template>

<script>
import Instrument from '../components/Instrument'
import songs from '../music/songs'

export default {
  components: {
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
    instrumentNames() {
      return this.song.tracks.map(track => track.instrument.constructor.name)
    },
    track() {
      if (this.$route.params.track == null) {
        return null
      } else {
        return this.$route.params.track - 1
      }
    },
    instrumentName() {
      if (this.track === null) {
        return null
      } else {
        return this.song.tracks[this.track].instrument.constructor.name
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
