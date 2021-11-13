<template lang="pug">
.control-panel.common-panel
  el-checkbox(
    :model-value="selectedItem.is_selected",
    @change="onSetDefaultSelection",
  ) Selected by default
  el-input(
    :model-value="selectedItem.uuid"
    placeholder="UUID",
  )
  el-input(
    :model-value="selectedItem.name"
    placeholder="Name",
    @input="onNameChange",
  )
  el-input(
    :model-value="selectedItem.price_modifier"
    type="number",
    placeholder="Price modifier",
    @input="onPriceChange",
  )
  el-button(
    type="primary",
    @click="onAddCondition"
  ) Add condition
  .condition(
    v-for="(condition, index) in selectedItem.condition"
  )
    el-select(
      :model-value="condition",
      @change="onConditionSelect($event, index)"
    )
      el-option(
        v-for="item in allItems",
        :key="item.uuid",
        :label="item.name",
        :value="item.uuid",
      )
    el-button(
      type="danger",
      @click="onConditionRemove(index)"
    ) X
  el-button(
    type="danger",
    @click="onItemRemove",
  ) Delete
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';
import { getAllItems, updateItemProps, deleteItem } from './Utils/update-item-props';


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
  emits: ['schemaChanged', 'resetSelection'],
  setup(props, { emit }) {
    const allItems = ref(getAllItems(props.schema));

    watch(props.schema, () => {
      allItems.value = getAllItems(props.schema);
    });

    const onNameChange = (value: string) => {
      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { name: value });
      emit('schemaChanged', newSchema);
    };

    const onAddCondition = () => {
      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { 
        condition: [
          ...props.selectedItem.condition || [],
          '',
        ]
       });

      emit('schemaChanged', newSchema);
    };

    const onConditionSelect = (value: string, index: number) => {
      const conditions = [...props.selectedItem.condition || []];
      conditions[index] = value;

      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { 
        condition: conditions
      });

      emit('schemaChanged', newSchema);
    };

    const onConditionRemove = (index: number) => {
      const conditions = [...props.selectedItem.condition || []];
      conditions.splice(index, 1);

      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { 
        condition: conditions
      });

      emit('schemaChanged', newSchema);
    };

    const onPriceChange = (value: number) => {
      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { price_modifier: +value });
      emit('schemaChanged', newSchema);
    };

    const onItemRemove = () => {
      const newSchema = deleteItem(props.selectedItem.uuid, props.schema);
      emit('schemaChanged', newSchema);
      emit('resetSelection');
    };

    const onSetDefaultSelection = () => {
      const isSelected = props.selectedItem.is_selected ?? false;
      const newSchema = updateItemProps(props.selectedItem.uuid, props.schema, { is_selected: !isSelected });
      emit('schemaChanged', newSchema);
    };

    return {
      allItems,
      onNameChange,
      onAddCondition,

      onPriceChange,

      onConditionSelect,
      onConditionRemove,
      onSetDefaultSelection,

      onItemRemove,
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