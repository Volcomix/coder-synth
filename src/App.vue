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

<style src="./styles/theme.css"></style>
<style src="./styles/typography.css"></style>
<style>
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
#app {
}
</style>
