<template lang="pug">
a.el-button(
  v-if="link !== ''"
  class="base-button"
  :class="buttonClass"
  :href="link"
  target="_blank"
)
  slot
el-button(
  v-else
  class="base-button"
  :class="buttonClass",
  :type="type",
  :size="size",
  @click="$emit('click')"
)
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    styles: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonClass () {
      const {
        isDisabled, styles
      } = this
      return [
        { 'is-disabled': isDisabled },
        { ['is-' + styles]: styles }
      ]
    }
  }
})
</script>

<style lang="scss">
.base-button {
  width: 100%;
  min-width: 150px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 4px;
  }
  button {
    width: 100%;
  }
}

.is-disabled {
  pointer-events: none;
}
</style>
