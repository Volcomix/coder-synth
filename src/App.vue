<template>
  <div id="app">
    <ThePad />
  </div>
</template>

<script>
import ThePad from './components/ThePad.vue'

export default {
  name: 'app',
  components: {
    ThePad,
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
}
</style>
