<template lang="pug">
el-button.options-button(
  v-if="isVisible",
  :type="isSelected ? 'primary' : ''",
  @click="handleButtonClick"
) {{ item.name }}
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { defineComponent, PropType, computed, Prop } from 'vue'
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
  },
  emits: ['select', 'unselect'],
  setup(props, { emit }) {
    const isSelected = computed(() => {
      return props.selectedElements.has(props.item.uuid);
    });

    const handleButtonClick = () => {
      if (isSelected.value) {
        emit('unselect', props.item.uuid);
      } else {
        emit('select', props.item.uuid);
      }
    };

    const isVisible = getVisibility(props);
    setVisibilityWatcher(emit, props.item, isVisible);

    return {
      isVisible,
      isSelected,
      handleButtonClick,
    }
  },
})
</script>

<style lang="scss">
.options-button {
  width: 100%;
}
</style>
