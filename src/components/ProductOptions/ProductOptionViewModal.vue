<template lang="pug">
el-dialog(
  :model-value="isVisible",
)
  product-options(
    v-if="isVisible",
    :sections="sections",
    :_selectedElements="selectedItems",
    :_selectedElementsMeta="selectedItemsMeta",
  )
</template>

<script lang="ts">
import { ProductOptionSection } from '@/common/interfaces/product-options';
import { defineComponent, PropType } from 'vue'

import ProductOptions from './ProductOptions.vue';

export default defineComponent({
  props: {
    isVisible: {
      default: false,
      type: Boolean,
    },
    sections: {
      type: Array as PropType<ProductOptionSection[]>,
    },
    selectedItems: {
      type: Array,
    },
    selectedItemsMeta: {
      type: Object,
    },
  },
  components: {
    ProductOptions,
  },
  setup() {
    
  },
})
</script>

<style lang="scss">

</style>
