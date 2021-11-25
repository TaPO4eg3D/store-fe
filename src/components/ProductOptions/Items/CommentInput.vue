<template lang="pug">
.comment-input
  .label {{ item.name }}:
  el-input(
    v-if="isVisible",
    :model-value="inputText",
    :label="item.name",
    type="textarea",
    @input="handleChange"
  ) {{ item.name }}
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
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
    const handleChange = (value: string) => {
      if (value === '') {
        emit('unselect', props.item.uuid);
      } else {
        emit('select', { uuid: props.item.uuid, options: { value }})
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
  margin-top: 12px;
  margin-bottom: 6px;
}
</style>
