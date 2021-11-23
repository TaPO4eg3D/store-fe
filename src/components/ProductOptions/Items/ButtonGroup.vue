<template lang="pug">
.button-group(v-if="isVisible")
  slot
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { computed, defineComponent, PropType } from 'vue'

import OptionButton from './Button.vue'

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
  components: {
    OptionButton
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
.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;

  column-gap: 4px;
}
</style>
