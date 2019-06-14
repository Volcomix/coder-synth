<template>
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
</template>

<script>
import Song from '../music/common/Song'

export default {
  props: {
    song: Song,
    track: Number,
  },
  computed: {
    instrumentName() {
      if (this.track === null) {
        return null
      } else {
        return this.song.tracks[this.track].instrument.constructor.name
      }
    },
    instrumentNames() {
      return this.song.tracks.map(track => track.instrument.constructor.name)
    },
  },
}
</script>
