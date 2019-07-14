<template>
  <VCard v-if="effectNames.length">
    <VCardText class="mt-3 ml-3 pt-3 pl-3 pb-0 pr-0">
      <VLayout wrap>
        <template v-for="effectName in effectNames">
          <VFlex :key="`slider-${effectName}`" xs8 md4 xl2>
            <VSlider
              thumb-label="always"
              :max="255"
              @input="setEffect(effectName, $event)"
            >
            </VSlider>
          </VFlex>
          <VFlex :key="`label-${effectName}`" xs4 md2 xl1 pt-2>
            <VSubheader>{{ effectName }}</VSubheader>
          </VFlex>
        </template>
      </VLayout>
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
