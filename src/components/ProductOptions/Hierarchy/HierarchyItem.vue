<template lang="pug">
.item-wrapper(
  :style="{ 'margin-left': `${8 * level}px` }"
) 
  .item(
    :class="{\
      'is-active': item.uuid === selectedItem,\
    }",
    @click="$emit('selectItem', item.uuid)",
  ) {{ item.name }}
  hierarchy-item(
    v-for="child in item.children",
    :item="child",
    :level="level + 1",
    :selectedItem="selectedItem",
    @selectItem="$emit('selectItem', $event)"
  )
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'hierarchy-item',
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductOptionElement>,
    },
    level: {
      required: true,
      type: Number,
      default: 0,
    },
    selectedItem: {
      required: true,
      type: String,
    },
  },
  emits: ['selectItem'],
  setup() {
    
  },
})
</script>

<style lang="scss">

</style>
