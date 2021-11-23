<template lang="pug">
.control-panel.control-panel-section
  .header Radio Control Panel
  el-button(
    type="primary",
    @click="createRadioItem"
  ) Create Radio Item
  control-panel-common(
    :schema="schema",
    :selectedItem="selectedItem",
    @schemaChanged="$emit('schemaChanged', $event)",
    @resetSelection="$emit('resetSelection', $event)",
  )
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options'

import ControlPanelCommon from './ControlPanelCommon.vue'
import { updateItemProps } from './Utils/update-item-props'

import { v4 as uuid } from 'uuid'

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
    selectedItem: {
      required: true,
      type: Object as PropType<ProductOptionElement>
    }
  },
  components: {
    ControlPanelCommon
  },
  emits: ['schemaChanged', 'resetSelection'],
  setup (props, { emit }) {
    const createRadioItem = () => {
      const children = props.selectedItem.children || []
      children.push({
        uuid: uuid(),
        item: 'radio-item',
        name: 'New Radio Item'
      })

      const newSchema = updateItemProps(
        props.selectedItem.uuid,
        props.schema,
        { children }
      )

      emit('schemaChanged', newSchema)
    }

    return {
      createRadioItem
    }
  }
})
</script>

<style lang="scss" scoped>
.condition {
  display: flex;

  .el-button {
    margin-left: 8px !important;
  }
}
</style>
