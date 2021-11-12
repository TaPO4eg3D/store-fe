<template lang="pug">
.control-panel.control-panel-section
  .header Choice Item Control Panel
  control-panel-common(
    :schema="schema",
    :selectedItem="selectedItem",
  )
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';

import ControlPanelCommon from './ControlPanelCommon.vue';

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
    selectedItem: {
      required: true,
      type: Object as PropType<ProductOptionElement>,
    },
  },
  components: {
    ControlPanelCommon,
  },
  emits: ['schemaChanged'],
  setup(props, { emit }) {
    return {
    }
  },
})
</script>

<style lang="scss">
.condition {
  display: flex;

  .el-button {
    margin-left: 8px !important;
  }
}
</style>