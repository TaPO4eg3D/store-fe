<template lang="pug">
.item(:style="{ 'margin-left': `${20 * level}px` }")
  option-button-group(
    v-if="item.item == 'button-group'"
    :item="item",
  )
    option-item(
      v-for="child in item.children",
      :item="child",
      :level="0",
      :selectedElements="selectedElements",
      @select="handleButtonGroupSelect(item, $event)",
      @unselect="handleButtonGroupUnselect(item)",
    )
  option-button(
    v-if="item.item == 'button'"
    :item="item",
    :selectedElements="selectedElements",
    @select="$emit('select', $event)",
    @unselect="$emit('unselect', $event)",
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options'

import OptionButton from './Items/Button.vue';
import OptionButtonGroup from './Items/ButtonGroup.vue';
import OptionChoice from './Items/Button.vue';
import OptionChoiceItem from './Items/Button.vue';
import OptionRadioItem from './Items/Button.vue';

export default defineComponent({
  name: 'option-item',
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductOptionElement>,
    },
    level: {
      required: true,
      type: Number,
    },
    selectedElements: {
      required: true,
      type: Set as PropType<Set<string>>,
    }
  },
  emits: ['select', 'unselect'],
  components: {
   OptionButton,
   OptionButtonGroup,
   OptionChoice,
   OptionChoiceItem,
   OptionRadioItem,
  },
  setup(props, { emit }) {
    const handleButtonGroupSelect = (item: ProductOptionElement, uuid: string) => {
      // Unselect everything from this group
      item.children?.forEach(child => {
        if (child.uuid !== uuid) {
          emit('unselect', child.uuid);
        } else {
          emit('select', child.uuid);
        }
      });

      // And mark the group itself as selected
      emit('select', item.uuid);
    }

    const handleButtonGroupUnselect = (item: ProductOptionElement) => {
      item.children?.forEach(child => {
        emit('unselect', child.uuid);
      });

      emit('unselect', item.uuid);
    }

    return {
      handleButtonGroupSelect,
      handleButtonGroupUnselect,
    }
  },
})
</script>

<style lang="scss">
.item {
  width: 100%;
  margin-bottom: 5px;

  .children {
    margin-top: 10px;
  }
}
</style>
