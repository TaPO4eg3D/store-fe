<template lang="pug">
.hierarchy
  .item(
    @click="$emit('selectItem', null)"
  ) Root
  .item-wrapper(
    v-for="section in schema",
    :style="{\
      'margin-left': '8px',\
    }",
  )
    .item(
      :class="{\
        'is-active': section.uuid === selectedItem,\
      }"
      @click="$emit('selectItem', section.uuid)",
    ) {{ section.name }}
    hierarchy-item(
      v-for="child in section.children",
      :item="child",
      :level="1",
      :selectedItem="selectedItem",
      @selectItem="$emit('selectItem', $event)",
    )
</template>

<script lang="ts">
import { ProductOptionSection } from '@/common/interfaces/product-options'
import { defineComponent, PropType, Ref, ref } from 'vue'

import HierarchyItem from './HierarchyItem.vue'

export default defineComponent({
  props: {
    schema: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    },
    selectedItem: {
      type: String
    }
  },
  emits: ['selectItem'],
  components: {
    HierarchyItem
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.hierarchy {
  border: 1px solid black;
  min-height: 300px;

  padding: 20px;

  margin-bottom: 20px;

  .item {
    user-select: none;

    cursor: pointer;
    padding: 2px;

    &:hover {
      color: #fff;
      background-color: #0084ff;

      transition: 0.3s ease;
    }
  }

  .is-active {
    color: #fff;
    background-color: #0084ff;
  }
}
</style>
