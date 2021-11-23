<template lang="pug">
.options-choice(v-if="isVisible")
  slot
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { defineComponent, PropType } from 'vue'
import { getVisibility, setVisibilityWatcher } from './Utils/isVisible'

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductOptionElement>
    },
    selectedElements: {
      required: true,
      type: Set as PropType<Set<string>>
    }
  },
  setup (props, { emit }) {
    const isVisible = getVisibility(props)
    setVisibilityWatcher(emit, props.item, isVisible)

    return {
      isVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.options-choice {
  display: flex;
  flex-direction: column;
}
</style>
