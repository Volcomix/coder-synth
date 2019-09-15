<template>
  <VNavigationDrawer
    app
    temporary
    :value="value"
    @input="$emit('input', $event)"
  >
    <VListItem>
      <VListItemContent>
        <VListItemTitle class="title">Coder Synth</VListItemTitle>
      </VListItemContent>
    </VListItem>
    <VDivider />
    <VList dense nav>
      <VSubheader>Select a song</VSubheader>
      <VListItemGroup color="primary">
        <VListItem
          v-for="(Song, songName) in songs"
          :key="songName"
          :to="{ name: 'song', params: { songName } }"
        >
          <VListItemContent>
            <VListItemTitle>{{ songName }}</VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VListItemGroup>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import songs from '../music/songs'

export default {
  props: {
    value: Boolean,
  },
  computed: {
    songs() {
      return songs
    },
  },
}
</script>
