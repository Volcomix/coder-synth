<template>
  <VMenu :nudge-width="100">
    <template v-slot:activator="{ on }">
      <VToolbarTitle v-on="on">
        <span v-if="trackName">{{ trackName }}</span>
        <span v-else>All tracks</span>
        <VIcon dark>arrow_drop_down</VIcon>
      </VToolbarTitle>
    </template>
    <VList dense nav>
      <VListItemGroup color="primary">
        <VListItem :to="{ params: { trackName: null } }" exact>
          <VListItemTitle>All tracks</VListItemTitle>
        </VListItem>
        <VListItem
          v-for="(_, name) in song.tracks"
          :key="name"
          :to="{ params: { trackName: name } }"
        >
          <VListItemTitle>{{ name }}</VListItemTitle>
        </VListItem>
      </VListItemGroup>
    </VList>
  </VMenu>
</template>

<script>
import Song from '../music/common/Song'

export default {
  props: {
    song: {
      type: Song,
      required: true,
    },
    trackName: {
      type: String,
      default: null,
    },
  },
}
</script>
