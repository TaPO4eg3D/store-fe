<template lang="pug">
.control-panel.control-panel-section
  .header NumberInput Control Panel
  el-checkbox(
    :model-value="fieldMeta?.strict_step",
    @change="onStrictStepUpdate",
  ) Strict Step
  el-input(
    :model-value="fieldMeta?.step_size",
    type="number",
    min="0",
    @input="onStepSizeUpdate",
  ) Step Size
  control-panel-common(
    :schema="schema",
    :selectedItem="selectedItem",
    @schemaChanged="$emit('schemaChanged', $event)",
    @resetSelection="$emit('resetSelection', $event)",
  )
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

import { NumberInputMeta, ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options'

import ControlPanelCommon from './ControlPanelCommon.vue'
import { updateItemProps } from './Utils/update-item-props'

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
    const fieldMeta = computed<NumberInputMeta | {}>(() => {
      return props.selectedItem?.meta || {}
    })

    const onStepSizeUpdate = (value: number) => {
      const newSchema = updateItemProps(
        props.selectedItem.uuid,
        props.schema,
        {
          meta: {
            ...props.selectedItem?.meta || {},
            step_size: value
          } as NumberInputMeta
        }
      )

      emit('schemaChanged', newSchema)
    }

    const onStrictStepUpdate = (value: boolean) => {
      const newSchema = updateItemProps(
        props.selectedItem.uuid,
        props.schema,
        {
          meta: {
            ...props.selectedItem?.meta || {},
            strict_step: value
          } as NumberInputMeta
        }
      )

      emit('schemaChanged', newSchema)
    }

    return {
      fieldMeta,

      onStepSizeUpdate,
      onStrictStepUpdate
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
