<template lang="pug">
.product-options
  option-section(
    v-for="section in sections",
    :section="section",
    :selectedElements="selectedElements",
    @select="handleSelect",
    @unselect="handleUnselect",
  )
</template>

<script lang="ts">
import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options'
import { defineComponent, PropType, ref, Ref } from 'vue'

import OptionSection from './Section.vue'

export default defineComponent({
  props: {
    sections: {
      required: true,
      type: Array as PropType<ProductOptionSection[]>
    }
  },
  components: {
    OptionSection,
  },
  setup(props) {
    const selectedElements: Ref<Set<string>> = ref(new Set([]))

    const fillSelectedElements = (item: ProductOptionElement) => {
      if (item.is_selected) {
        selectedElements.value.add(item.uuid);
      }

      item.children?.forEach(child => {
        fillSelectedElements(child);
      })
    };

    props.sections.forEach(section => {
      section.children.forEach(child => {
        fillSelectedElements(child);
      });
    });

    const handleSelect = (uuid: string) => {
      console.log('SELECT: ', uuid);
      selectedElements.value.add(uuid);
    };

    const handleUnselect = (uuid: string) => {
      console.log('UNSELECT: ', uuid);
      selectedElements.value.delete(uuid);
    };

    return {
      selectedElements,
      handleSelect,
      handleUnselect,
    }
  },
})
</script>
