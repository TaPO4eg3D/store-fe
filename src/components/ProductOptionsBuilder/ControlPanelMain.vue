<template lang="pug">
.control-panel.control-panel-main
  .header Main Control Panel
  el-button(
    type="primary",
    @click="createSection",
  ) Create Section
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ProductOptionSection } from '@/common/interfaces/product-options';

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
  },
  emits: ['schemaChanged'],
  setup(props, { emit }) {
    const createSection = () => {
      const schema = [...props.schema];
      schema.push({
        item: 'section',
        name: `Section ${schema.length + 1}`,
        uuid: `section-${schema.length + 1}`,
        children: [],
      });

      emit('schemaChanged', schema);
    };

    return {
      createSection,
    }
  },
})
</script>
