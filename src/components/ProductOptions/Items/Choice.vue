<template lang="pug">
.options-choice
  slot
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductOptionElement>,
    },
    selectedElements: {
      required: true,
      type: Set as PropType<Set<string>>,
    },
  },
  setup() {
    
  },
})
</script>

<style lang="scss">
.options-choice {
  display: flex;
  flex-direction: column;
}
</style>
