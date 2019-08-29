<template>
  <VNavigationDrawer
    app
    temporary
    :value="value"
    @input="$emit('input', $event)"
  >
    <VAppBar flat>
      <VList>
        <VListItem>
          <VListItemContent>
            <VListItemTitle class="title">Songs</VListItemTitle>
          </VListItemContent>
        </VListItem>
      </VList>
    </VAppBar>
    <VDivider />
    <VList>
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
