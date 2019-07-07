<template>
  <VCard class="pt-3">
    <VCardText>
      <VSlider
        v-for="effectName in effectNames"
        :key="effectName"
        thumb-label="always"
        :max="255"
        :label="effectName"
        @input="setEffect(effectName, $event)"
      ></VSlider>
    </VCardText>
  </VCard>
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
      const methodNames = [
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(this.instrument)),
        ...Object.keys(this.instrument),
      ]
      return methodNames
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
