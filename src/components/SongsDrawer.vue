<template>
  <VNavigationDrawer
    absolute
    temporary
    :value="value"
    @input="$emit('input', $event)"
  >
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
