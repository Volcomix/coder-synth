<template>
  <VMenu :nudge-width="100">
    <template #activator="{ on: menu }">
      <VBtn class="body-1 text-none" text v-on="menu">
        <span>{{ trackName || 'All tracks' }}</span>
        <VIcon dark>mdi-menu-down</VIcon>
      </VBtn>
    </template>
    <VList dense nav>
      <VSubheader>Select a track</VSubheader>
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
