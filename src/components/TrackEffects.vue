<template>
  <VCard v-if="effectNames.length">
    <VCardText>
      <VRow dense>
        <VCol
          v-for="effectName in effectNames"
          :key="effectName"
          cols="12"
          md="6"
          xl="3"
        >
          <VSlider
            thumb-label
            :max="255"
            :label="effectName"
            @input="setEffect(effectName, $event)"
          >
          </VSlider>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
import Instrument from '../music/common/Instrument'

export default {
  props: {
    instrument: {
      type: Instrument,
      required: true,
    },
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
