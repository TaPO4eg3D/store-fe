<template lang="pug">
.control-panel.control-panel-section
  .header Section Control Panel
  el-button(
    type="primary",
    @click="createButton",
  ) Create Button
  el-button(
    type="primary",
    @click="createButtonGroup",
  ) Create Button Group
  el-button(
    type="primary",
    @click="createChoice",
  ) Create Choice
  el-button(
    type="primary",
    @click="createRadio",
  ) Create Radio
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';

import { v4 as uuid } from 'uuid';

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
    selectedItem: {
      type: Object as PropType<ProductOptionElement>,
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

    const createButton = () => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (!section) {
        return;
      }

      section.children?.push({
        uuid: uuid(),
        item: 'button',
        name: 'New button',
      });

      emit('schemaChanged', schema);
    };

    const createButtonGroup = () => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (!section) {
        return;
      }

      section.children?.push({
        uuid: uuid(),
        item: 'button-group',
        name: 'New button group',
      });

      emit('schemaChanged', schema);
    };

    const createChoice = () => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (!section) {
        return;
      }

      section.children?.push({
        uuid: uuid(),
        item: 'choice',
        name: 'New choice',
      });

      emit('schemaChanged', schema);
    };

    const createRadio = () => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (!section) {
        return;
      }

      section.children?.push({
        uuid: uuid(),
        item: 'radio',
        name: 'New radio',
      });

      emit('schemaChanged', schema);
    };

    return {
      createSection,
      createButton,
      createButtonGroup,
      createChoice,
      createRadio,
    }
  },
})
</script>
