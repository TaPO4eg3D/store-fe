<template lang="pug">
.button-group
  slot
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { defineComponent, PropType } from 'vue'

import OptionButton from './Button.vue';

export default defineComponent({
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductOptionElement>,
    }
  },
  components: {
    OptionButton,
  },
  setup() {
    
  },
})
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: 8px;
}
</style>
