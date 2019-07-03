<template>
  <VMenu :nudge-width="100">
    <template v-slot:activator="{ on }">
      <VToolbarTitle v-on="on">
        <span v-if="track === null">All tracks</span>
        <span v-else>Track {{ track + 1 }}</span>
        <VIcon dark>arrow_drop_down</VIcon>
      </VToolbarTitle>
    </template>
    <VList>
      <VListTile :to="{ params: { track: null } }" exact>
        <VListTileTitle>All tracks</VListTileTitle>
      </VListTile>
      <VListTile
        v-for="(_, index) in song.tracks"
        :key="index"
        :to="{ params: { track: index + 1 } }"
      >
        <VListTileTitle>Track {{ index + 1 }}</VListTileTitle>
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
}
</script>
