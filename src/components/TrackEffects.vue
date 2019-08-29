<template>
  <VCard v-if="effectNames.length">
    <VCardText class="mt-3 ml-3 pt-3 pl-3 pb-0 pr-0">
      <VRow>
        <template v-for="effectName in effectNames">
          <VCol :key="`slider-${effectName}`" cols="8" md="4" xl="2">
            <VSlider
              thumb-label="always"
              :max="255"
              @input="setEffect(effectName, $event)"
            >
            </VSlider>
          </VCol>
          <VCol
            :key="`label-${effectName}`"
            class="pt-2"
            cols="4"
            md="2"
            xl="1"
          >
            <VSubheader>{{ effectName }}</VSubheader>
          </VCol>
        </template>
      </VRow>
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

<style scoped>
.slider {
  width: 300px;
}
</style>
