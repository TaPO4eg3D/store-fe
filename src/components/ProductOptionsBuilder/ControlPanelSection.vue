<template lang="pug">
.control-panel.control-panel-section
  .header Section Control Panel
  el-input(
    :model-value="selectedItem.name",
    @input="onNameChange",
  ) 
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
  el-button(
    type="danger",
    @click="onDelete",
  ) Delete
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ProductOptionSection } from '@/common/interfaces/product-options';

import { v4 as uuid } from 'uuid';

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
    selectedItem: {
      type: Object as PropType<ProductOptionSection>,
    },
  },
  emits: ['schemaChanged', 'resetSelection'],
  setup(props, { emit }) {
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

    const onNameChange = (value: string) => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (section) {
        section.name = value;
      }

      emit('schemaChanged', schema);
    };

    const onDelete = () => {
      const schema = [...props.schema];
      const section = schema.find(section => section.uuid === props.selectedItem?.uuid);

      if (section) {
        const index = schema.indexOf(section);
        schema.splice(index , 1);
      }

      emit('schemaChanged', schema);
      emit('resetSelection');
    };

    return {
      createButton,
      createButtonGroup,
      createChoice,
      createRadio,

      onNameChange,
      onDelete,
    }
  },
})
</script>
