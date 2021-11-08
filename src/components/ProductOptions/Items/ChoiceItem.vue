<template lang="pug">
el-checkbox(
  :model-value="isSelected",
  @change="handleChange"
) {{ item.name }}
</template>

<script lang="ts">
import { ProductOptionElement } from '@/common/interfaces/product-options'
import { computed, defineComponent, PropType, ref } from 'vue'

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
  setup(props, { emit }) {
    const isSelected = computed(() => {
      return props.selectedElements.has(props.item.uuid);
    });

    const handleChange = () => {
      if (isSelected.value) {
        emit('unselect', props.item.uuid);
      } else {
        emit('select', props.item.uuid);
      }
    };

    return {
      isSelected,
      handleChange,
    }
  },
})
</script>

<style lang="scss">

</style>
