<template>
  <div :style="deltaStyle">
    <i :class="arrowClass"/><span>{{deltaString}}</span>
  </div>
</template>

<script>
export default {
  props: {
    delta: Number
  },
  methods: {
    sgnFormat (value, whenZero, whenPos, whenNeg) {
      if (value > 0) {
        return whenPos
      } else if (value < 0) {
        return whenNeg
      } else {
        return whenZero
      }
    }
  },
  computed: {
    arrowClass () {
      return this.sgnFormat(this.delta, '', 'el-icon-caret-top', 'el-icon-caret-bottom')
    },
    deltaString () {
      return this.delta === 0 ? '-' : Math.abs(this.delta)
    },
    deltaStyle () {
      let textColor = this.sgnFormat(this.delta, '#444', '#20d63b', '#f71707')
      return `margin-left: ${this.delta === 0 ? '.1rem' : '0'}; color:${textColor}`
    }
  }
}
</script>
