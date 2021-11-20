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
      @resetSelection="onResetSelection",
    )
    control-panel-section(
      v-if="selectedItemComponent?.item === 'section'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-button(
      v-if="selectedItemComponent?.item === 'button'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-button-group(
      v-if="selectedItemComponent?.item === 'button-group'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-choice(
      v-if="selectedItemComponent?.item === 'choice'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-choice-item(
      v-if="selectedItemComponent?.item === 'choice-item'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-radio(
      v-if="selectedItemComponent?.item === 'radio'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-radio-item(
      v-if="selectedItemComponent?.item === 'radio-item'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-text-input(
      v-if="selectedItemComponent?.item === 'text-input'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-comment-input(
      v-if="selectedItemComponent?.item === 'comment-input'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    control-panel-number-input(
      v-if="selectedItemComponent?.item === 'number-input'",
      :schema="workingSchema",
      :selectedItem="selectedItemComponent",
      @schemaChanged="onSchemaChange",
      @resetSelection="onResetSelection",
    )
    el-button(
      type="success",
      style="margin-top: 40px",
      @click="saveSchema",
    ) Save Schema
  .preview
    product-options(
      :sections="workingSchema",
    )
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router';

import axios from 'axios';

import ControlPanelMain from '@/components/ProductOptionsBuilder/ControlPanelMain.vue'
import ControlPanelSection from '@/components/ProductOptionsBuilder/ControlPanelSection.vue'
import ControlPanelButton from '@/components/ProductOptionsBuilder/ControlPanelButton.vue'
import ControlPanelButtonGroup from '@/components/ProductOptionsBuilder/ControlPanelButtonGroup.vue'
import ControlPanelChoice from '@/components/ProductOptionsBuilder/ControlPanelChoice.vue'
import ControlPanelChoiceItem from '@/components/ProductOptionsBuilder/ControlPanelChoiceItem.vue'
import ControlPanelRadio from '@/components/ProductOptionsBuilder/ControlPanelRadio.vue'
import ControlPanelRadioItem from '@/components/ProductOptionsBuilder/ControlPanelRadioItem.vue'
import ControlPanelTextInput from '@/components/ProductOptionsBuilder/ControlPanelTextInput.vue'
import ControlPanelCommentInput from '@/components/ProductOptionsBuilder/ControlPanelCommentInput.vue'
import ControlPanelNumberInput from '@/components/ProductOptionsBuilder/ControlPanelNumberInput.vue'

import { ProductOptionElement, ProductOptionSection } from '@/common/interfaces/product-options';

import Hierarchy from '@/components/ProductOptions/Hierarchy/Hierarchy.vue'
import ProductOptions from '@/components/ProductOptions/ProductOptions.vue'

import { Product } from '@/common/interfaces/product';


export default defineComponent({
  components: {
    Hierarchy,

    ControlPanelMain,
    ControlPanelSection,
    ControlPanelButton,
    ControlPanelButtonGroup,
    ControlPanelChoice,
    ControlPanelChoiceItem,
    ControlPanelRadio,
    ControlPanelRadioItem,
    ControlPanelTextInput,
    ControlPanelCommentInput,
    ControlPanelNumberInput,

    ProductOptions,
  },
  setup() {
    const route = useRoute();

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

    const onResetSelection = () => {
      selectedItem.value = null;
    }

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

    let product: Product | null = null;

    onMounted(async () => {
      const productID = route.params.id;
      const responseProduct = await axios.get<Product>(`/api/products/${productID}/`);

      product = responseProduct.data;
      const additionalOptions = product.additional_options;

      if (additionalOptions) {
        onSchemaChange(additionalOptions);
      }
    });

    const saveSchema = async () => {
      const productID = route.params.id;

      await axios.put(`/api/products/${productID}/`, {
        additional_options: workingSchema.value,
      } as Partial<Product>);

      alert('Done!');
    };
    
    return {
      workingSchema,

      selectedItem,
      selectedItemComponent,

      onSchemaChange,
      onSelectItem,
      onResetSelection,

      saveSchema,
    }
  },
})
</script>

<style lang="scss">
.builder {
  display: grid;

  grid-template-columns: 400px 1fr;

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
