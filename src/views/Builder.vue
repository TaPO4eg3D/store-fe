<template lang="pug">
.builder
  .control-container
    hierarchy(
      :schema="workingSchema",
      :selectedItem="selectedItem",
      @selectItem="onSelectItem",
    )
    control-panel-main(
      v-if="selectedItem === null",
      :schema="workingSchema",
      @schemaChanged="onSchemaChange",
    )
    control-panel-section(
      v-if="selectedItemComponent?.item === 'section'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
    )
    control-panel-button(
      v-if="selectedItemComponent?.item === 'button'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
    )
  .preview
    product-options(
      :sections="workingSchema",
    )
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue'

import { v4 as uuidv4 } from 'uuid';

import ControlPanelMain from '@/components/ProductOptionsBuilder/ControlPanelMain.vue'
import ControlPanelSection from '@/components/ProductOptionsBuilder/ControlPanelSection.vue'
import ControlPanelButton from '@/components/ProductOptionsBuilder/ControlPanelButton.vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';

import Hierarchy from '@/components/ProductOptions/Hierarchy/Hierarchy.vue'
import ProductOptions from '@/components/ProductOptions/ProductOptions.vue'


const testSchema: ProductOptionSection[] = [
  {
    name: 'Section 1',
    item: 'section',
    uuid: 'section-1',
    children: [
      {
        uuid: '123',
        item: 'button-group',
        children: [
          {
            uuid: uuidv4(),

            name: 'Test button 1',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            hint: 'Test hint'
          },
          {
            uuid: uuidv4(),
            name: 'Test button 2',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            hint: 'Test hint'
          },
          {
            uuid: uuidv4(),
            name: 'Test button 3',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            hint: 'Test hint'
          },
        ],
      },
      {
        uuid: uuidv4(),
        item: 'choice',
        children: [
          {
            uuid: uuidv4(),
            name: 'choice-item 1',
            item: 'choice-item',
          }
        ]
      },
      {
        uuid: uuidv4(),
        item: 'radio',
        children: [
          {
            uuid: uuidv4(),
            name: 'choice-item 1',
            item: 'radio-item',
          },
          {
            uuid: uuidv4(),
            name: 'choice-item 2',
            item: 'radio-item',
          },
          {
            uuid: uuidv4(),
            name: 'choice-item 3',
            item: 'radio-item',
          },
        ]
      },
      {
        uuid: '321',
        item: 'button-group',
        condition: ['123'],
        children: [
          {
            uuid: uuidv4(),
            name: 'Test button 4',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            hint: 'Test hint'
          },
        ]
      },
      {
        uuid: uuidv4(),
        item: 'button-group',
        condition: ['321'],
        children: [
          {
            uuid: uuidv4(),
            name: 'Test button 5',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            children: [

            ],
            hint: 'Test hint'
          },
        ]
      },
    ]
  }
]

export default defineComponent({
  components: {
    Hierarchy,

    ControlPanelMain,
    ControlPanelSection,
    ControlPanelButton,

    ProductOptions,
  },
  setup() {
    const itemMap: Ref<Map<string, ProductOptionElement>> = ref(new Map());
    const workingSchema: Ref<ProductOptionSection[]> = ref([]);

    const selectedItem: Ref<string | null> = ref(null);

    const traverseItem = (item: ProductOptionElement) => {
      itemMap.value.set(item.uuid, item);

      item.children?.forEach(child => {
        traverseItem(child);
      });
    };

    const updateItemMap = () => {
      workingSchema.value.forEach(section => {
        // TODO: FIX TYPINGS
        // @ts-ignore
        itemMap.value.set(section.uuid, section);

        section.children.forEach(item => {
          traverseItem(item);
        });
      });
    };

    const onSchemaChange = (schema: ProductOptionSection[]) => {
      console.log(schema);
      workingSchema.value = schema;
      updateItemMap();
    };

    const onSelectItem = (uuid: string) => {
      selectedItem.value = uuid;
    };

    const selectedItemComponent = computed(() => {
      if (!selectedItem.value) {
        return null;
      }

      const _selectedItem = itemMap.value.get(selectedItem.value);

      if (!_selectedItem) {
        return null;
      }
      
      console.log(_selectedItem.item);
      return _selectedItem;
    });

    return {
      testSchema,
      workingSchema,

      selectedItem,
      selectedItemComponent,

      onSchemaChange,
      onSelectItem,
    }
  },
})
</script>

<style lang="scss">
.builder {
  display: grid;

  grid-template-columns: 250px 1fr;

  .control-container {
    display: flex;
    flex-direction: column;
  }

  .control-panel {
    display: flex;
    gap: 10px;

    border: 1px solid black;
    border-radius: 10px;

    padding: 20px;

    flex-direction: column;

    .el-button {
      margin: 0px;
    }

    .header {
      text-transform: uppercase;

      text-align: center;
      margin-bottom: 20px;
    }
  }

  .preview {
    margin-left: 100px;
    max-width: 400px;
  }
}
</style>
