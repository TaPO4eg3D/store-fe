<template lang="pug">
.product-options
  option-section(
    v-for="section in sections",
    :section="section",
    :selectedElements="selectedElements",
    :selectedElementsAdditionOptions="selectedElementsAdditionOptions",
    @select="handleSelect",
    @unselect="handleUnselect",
  )
</template>

<script lang="ts">
import { NumberInputMeta, ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options'
import { defineComponent, PropType, ref, Ref, watch, computed } from 'vue'

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
    const requiredElements: Ref<Set<string>> = ref(new Set([]))

    const itemMap: { [uuid: string]: ProductOptionElement } = {};

    const selectedElementsAdditionOptions: Ref<{
      [uuid: string]: object,
    }> = ref({});

    const fillSelectedElements = (item: ProductOptionElement) => {
      if (item.is_selected) {
        selectedElements.value.add(item.uuid);
      }

      if (item.required) {
        requiredElements.value.add(item.uuid);
      }

      itemMap[item.uuid] = item;

      item.children?.forEach(child => {
        fillSelectedElements(child);
      })
    };

    const fillSections = () => {
      props.sections.forEach(section => {
        section.children.forEach(child => {
          fillSelectedElements(child);
        });
      });
    };

    watch(props, () => {
      fillSections();
    })

    fillSections();

    const handleSelect = ({ uuid, options }: { uuid: string, options: object }) => {
      selectedElements.value.add(uuid);
      
      if (options) {
        selectedElementsAdditionOptions.value[uuid] = options;
      }
    };

    const handleUnselect = (uuid: string) => {
      selectedElements.value.delete(uuid);
    };

    const resultingPrice = computed<number>(() => {
      let price = 0;
      selectedElements.value.forEach(uuid => {
        const item = itemMap[uuid];
        
        if (!item) {
          return;
        }

        const price_modifier = item.price_modifier || 0;

        if (price_modifier === 0) {
          return;
        }

        if (item.item === 'number-input') {
          const { value } = selectedElementsAdditionOptions.value[uuid] as any;
          const meta = item.meta as NumberInputMeta;
          
          if (meta.step_size !== 0) {
            const diff = price_modifier / meta.step_size;
            price += value * diff;

            return;
          } 
        }

        price += item.price_modifier || 0;
      });

      return price;
    });

    const isValid = computed<boolean>(() => {
      for (const uuid of requiredElements.value) {
        if (!selectedElements.value.has(uuid)) {
          return false;
        }
      }

      return true;
    })

    return {
      selectedElements,
      requiredElements,
      selectedElementsAdditionOptions,

      resultingPrice,
      itemMap,

      isValid,
      handleSelect,
      handleUnselect,
    }
  },
})
</script>
