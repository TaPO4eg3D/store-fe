<template lang="pug">
.option-section
  .header {{ section.name }}
  .items
    option-item(
      v-for="item in section.children"
      :item="item"
      :level="0",
      :selectedElements="selectedElements",
      :selectedElementsAdditionOptions="selectedElementsAdditionOptions",
      @select="$emit('select', $event)",
      @unselect="$emit('unselect', $event)",
    )
</template>

<script lang="ts">
import { ProductOptionSection } from '@/common/interfaces/product-options'
import { defineComponent, PropType } from 'vue'

import OptionItem from '@/components/ProductOptions/OptionItem.vue'

export default defineComponent({
  props: {
    section: {
      required: true,
      type: Object as PropType<ProductOptionSection>
    },
    selectedElements: {
      required: true,
      type: Set as PropType<Set<string>>
    },
    selectedElementsAdditionOptions: {
      type: Object
    }
  },
  emits: ['select', 'unselect'],
  components: {
    OptionItem
  },
  setup () {

  }
})
</script>

<style lang="scss" scoped>
.option-section {
  .header {
    font-weight: 800;
    text-align: center;

    margin-bottom: 20px;
  }

  margin-bottom: 20px;
}
</style>
