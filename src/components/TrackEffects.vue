<template>
  <v-card>
    <v-card-text>
      <v-slider
        v-for="effectName in effectNames"
        :key="effectName"
        thumb-label
        :max="255"
        :label="effectName"
        @input="setEffect(effectName, $event)"
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import Instrument from '../music/common/Instrument'

export default {
  props: {
    instrument: Instrument,
    isPlaying: Boolean,
  },
  computed: {
    effectNames() {
      return Object.getOwnPropertyNames(Object.getPrototypeOf(this.instrument))
        .filter(methodName => methodName.startsWith('fx'))
        .map(methodName => methodName.substring(2))
    },
  },
  methods: {
    setEffect(effectName, effectValue) {
      if (this.isPlaying) {
        this.instrument.setEffect(effectName, effectValue)
      }
    },
  },
}
</script>
