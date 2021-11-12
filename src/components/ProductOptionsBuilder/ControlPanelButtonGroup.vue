<template lang="pug">
.control-panel.control-panel-button-group
  .header Button Group Control Panel
  el-button(
    type="primary",
    @click="createButton",
  ) Create Button
  control-panel-common(
    :schema="schema",
    :selectedItem="selectedItem",
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
  emits: ['schemaChanged'],
  setup(props, { emit }) {
    const createButton = () => {
      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, {
        children: [
          ...props.selectedItem.children || [],
          {
            uuid: uuid(),
            name: 'New Button',
            item: 'button',
          }
        ]
      });

      emit('schemaChanged', newSchema)
    }

    return {
      createButton,
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