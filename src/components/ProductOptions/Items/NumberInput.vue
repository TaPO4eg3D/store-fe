<template lang="pug">
.number-input
  .label {{ item.name }}:
  el-input(
    v-if="isVisible",
    :model-value="inputText",
    :label="item.name",
    type="number",
    :step="fieldMeta.step_size",
    @input="handleChange",
  ) {{ item.name }}
</template>

<script lang="ts">
import { NumberInputMeta, ProductOptionElement } from '@/common/interfaces/product-options'
import { computed, defineComponent, PropType, ref } from 'vue'
import { getVisibility, setVisibilityWatcher } from './Utils/isVisible';

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
    selectedElementsAdditionOptions: {
      type: Object,
    },
  },
  emits: ['select', 'unselect'],
  setup(props, { emit }) {
    const fieldMeta = computed<NumberInputMeta | null>(() => {
      return props.item?.meta as NumberInputMeta;
    })

    const handleChange = (value: string) => {
      if (value === '') {
        emit('unselect', props.item.uuid);
      } else {
        let finalValue = +value;

        if (fieldMeta.value?.strict_step) {
          const stepSize = fieldMeta.value.step_size;
          finalValue = Math.floor(finalValue / stepSize) * stepSize;
        }

        emit('select', { uuid: props.item.uuid, options: { value: finalValue }})
      }
    };

    const isVisible = getVisibility(props);
    setVisibilityWatcher(emit, props.item, isVisible);

    const inputText = computed(() => {
      const opts: any = props.selectedElementsAdditionOptions;

      if (opts) {
        return opts[props.item.uuid]?.value;
      }

      return '';
    });

    return {
      fieldMeta,
      isVisible,
      handleChange,
      inputText,
    }
  },
})
</script>

<style lang="scss" scoped>
.label {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 6px;
}
</style>
