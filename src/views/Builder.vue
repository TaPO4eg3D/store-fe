<template lang="pug">
.builder
  control-panel-main
  .preview
    product-options(
      :sections="testSchema",
    )
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { v4 as uuidv4 } from 'uuid';

import ControlPanelMain from '@/components/ProductOptionsBuilder/ControlPanelMain.vue'
import { ProductOptionSection } from '@/common/interfaces/product-options';

import ProductOptions from '@/components/ProductOptions/ProductOptions.vue'

const testSchema: ProductOptionSection[] = [
  {
    name: 'Section 1',
    children: [
      {
        uuid: uuidv4(),
        item: 'button-group',
        children: [
          {
            uuid: uuidv4(),

            name: 'Test button 1',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            children: [

            ],
            hint: 'Test hint'
          },
          {
            uuid: uuidv4(),
            name: 'Test button 2',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            children: [

            ],
            hint: 'Test hint'
          },
          {
            uuid: uuidv4(),
            name: 'Test button 3',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            children: [
              {
                uuid: uuidv4(),
                name: 'Test button',
                item: 'button',
                price_modifier: 20.0,
                is_selected: false,
                children: [

                ],
                hint: 'Test hint'
              },
            ],
            hint: 'Test hint'
          },
        ],
      },
      {
        uuid: uuidv4(),
        item: 'button-group',
        children: [
          {
            uuid: uuidv4(),
            name: 'Test button 4',
            item: 'button',
            price_modifier: 20.0,
            is_selected: false,
            children: [

            ],
            hint: 'Test hint'
          },
        ]
      },
      {
        uuid: uuidv4(),
        item: 'button-group',
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
    ControlPanelMain,
    ProductOptions,
  },
  setup() {
    const selectedComponent = ref(null);

    return {
      selectedComponent,
      testSchema,
    }
  },
})
</script>

<style lang="scss">
.builder {
  display: grid;

  grid-template-columns: 300px 1fr;

  .control-panel {
    display: flex;
    gap: 10px;
    max-width: 200px;

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
    max-width: 400px;
  }
}
</style>
