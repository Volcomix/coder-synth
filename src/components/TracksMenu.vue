<template>
  <VMenu :nudge-width="100">
    <template v-slot:activator="{ on }">
      <VToolbarTitle v-on="on">
        <span v-if="trackName">{{ trackName }}</span>
        <span v-else>All tracks</span>
        <VIcon dark>arrow_drop_down</VIcon>
      </VToolbarTitle>
    </template>
    <VList>
      <VListTile :to="{ params: { trackName: null } }" exact>
        <VListTileTitle>All tracks</VListTileTitle>
      </VListTile>
      <VListTile
        v-for="(_, name) in song.tracks"
        :key="name"
        :to="{ params: { trackName: name } }"
      >
        <VListTileTitle>{{ name }}</VListTileTitle>
      </VListTile>
    </VList>
  </VMenu>
</template>

<script>
import Song from '../music/common/Song'

export default {
  props: {
    song: Song,
    trackName: String,
  },
}
</script>
