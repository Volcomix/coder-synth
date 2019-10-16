<template>
  <div
    ref="oscilloscope"
    v-resize="resize"
    class="oscilloscope my-3 flex-grow-1"
  >
    <canvas ref="canvas" class="canvas" :width="width" :height="height" />
  </div>
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
      if (this.analyser) {
        return this.analyser.frequencyBinCount
      } else {
        return 2
      }
    },
    dataArray() {
      return Uint8Array.from({ length: this.bufferLength }, () => 128)
    },
  },
  mounted() {
    this.context = this.$refs.canvas.getContext('2d')
    this.draw()
  },
  updated() {
    this.resize()
  },
  methods: {
    resize() {
      const { width, height } = this.$refs.oscilloscope.getBoundingClientRect()
      if (width !== this.width || height !== this.height) {
        this.width = width
        this.height = height
      }
    },
    draw() {
      requestAnimationFrame(this.draw)
      if (this.analyser) {
        this.analyser.getByteTimeDomainData(this.dataArray)
      }
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.lineWidth = 2
      this.context.strokeStyle = this.$vuetify.theme.themes.light.primary
      this.context.beginPath()
      const sliceWidth = this.width / (this.bufferLength - 1)
      let x = 0
      for (let i = 0; i < this.bufferLength; i++) {
        const v = this.dataArray[i] / 128
        const y = 1 + v * (this.height / 2 - 1)
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
.oscilloscope {
  min-height: 80px;
}
.canvas {
  position: absolute;
}
</style>
