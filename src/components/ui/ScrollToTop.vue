<template lang="pug">
.scroll-top-button(
  id="pagetop"
  @click="toTop")
  el-icon
    arrow-up-bold
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScrollToTop',
  data () {
    return {
      scTimer: 0,
      scY: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.scroll-top-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  transition: ease-out .2s;
  background-color: #a8d1ff;
  color: #FFFFFF;
  opacity: .5;

  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 1049;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
