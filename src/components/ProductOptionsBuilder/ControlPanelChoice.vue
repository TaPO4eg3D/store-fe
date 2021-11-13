<template lang="pug">
.control-panel.control-panel-section
  .header Choice Control Panel
  el-button(
    type="primary",
    @click="createChoiceItem"
  ) Create Choice Item
  control-panel-common(
    :schema="schema",
    :selectedItem="selectedItem",
    @schemaChanged="$emit('schemaChanged', $event)",
    @resetSelection="$emit('resetSelection', $event)",
  )
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';

import ControlPanelCommon from './ControlPanelCommon.vue';
import { updateItemProps } from './Utils/update-item-props';

import { v4 as uuid } from 'uuid';

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
  emits: ['schemaChanged', 'resetSelection'],
  setup(props, { emit }) {
    const createChoiceItem = () => {
      const children = props.selectedItem.children || [];
      children.push({
        uuid: uuid(),
        item: 'choice-item',
        name: 'New Choice Item',
      });

      const newSchema = updateItemProps(
        props.selectedItem.uuid,
        props.schema,
        { children },
      );

      emit('schemaChanged', newSchema);
    };

    return {
      createChoiceItem,
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