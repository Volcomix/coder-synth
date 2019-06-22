<template>
  <VFlex ref="oscilloscope" v-resize="resize">
    <canvas ref="canvas" class="canvas" :width="width" :height="height" />
  </VFlex>
</template>

<script>
export default {
  props: {
    analyser: AnalyserNode,
  },
  data() {
    return {
      width: null,
      height: null,
      context: null,
    }
  },
  computed: {
    bufferLength() {
      return this.analyser.frequencyBinCount
    },
    dataArray() {
      return new Uint8Array(this.bufferLength)
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.draw()
  },
  methods: {
    resize() {
      const { width, height } = this.$refs.oscilloscope.getBoundingClientRect()
      this.width = width
      this.height = height
    },
    draw() {
      requestAnimationFrame(this.draw)
      this.analyser.getByteTimeDomainData(this.dataArray)
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.lineWidth = 1
      this.context.strokeStyle = this.$vuetify.theme.primary
      this.context.beginPath()
      const sliceWidth = (this.width * 1) / this.bufferLength
      let x = 0
      for (let i = 0; i < this.bufferLength; i++) {
        const v = this.dataArray[i] / 128
        const y = (v * this.height) / 2
        if (i === 0) {
          this.context.moveTo(x, y)
        } else {
          this.context.lineTo(x, y)
        }
        x += sliceWidth
      }
      this.context.stroke()
    },
  },
}
</script>

<style scoped>
.canvas {
  position: absolute;
}
</style>