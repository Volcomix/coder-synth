<template>
  <VNavigationDrawer
    app
    temporary
    :value="value"
    @input="$emit('input', $event)"
  >
    <VListItem>
      <VListItemContent>
        <VListItemTitle class="title">Songs</VListItemTitle>
      </VListItemContent>
    </VListItem>
    <VDivider />
    <VList dense nav>
      <VListItem
        v-for="(Song, songName) in songs"
        :key="songName"
        :to="{ name: 'song', params: { songName } }"
      >
        <VListItemContent>
          <VListItemTitle>{{ songName }}</VListItemTitle>
        </VListItemContent>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import songs from '../music/songs'

export default {
  props: ['value'],
  computed: {
    songs() {
      return songs
    },
  },
}
</script>
