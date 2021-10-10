<template lang="pug">
general-card.selling-hits(
  header="Bestsellers",
  :isSlider="true",
)
  .splide__slide(
    v-for="product in products",
    :key="product.id",
  )
    product-card(
      :product="product"
    )
</template>

<script lang="ts">
import axios from 'axios';

import { Product } from '@/common/interfaces/product';
import { defineComponent, ref, Ref, onMounted } from 'vue';

import GeneralCard from '@/components/GeneralCard.vue';
import ProductCard from '@/components/ProductCard.vue';

export default defineComponent({
  components: {
    ProductCard,
    GeneralCard,
  },
  setup() {
    const products: Ref<Product[]> | Ref<never[]> = ref([]);

    onMounted(async () => {
      const response 
        = await axios.get<Product[]>('/api/popular-products');
      
      products.value = response.data;
    });

    return {
      products,
    }
  },
})
</script>

<style lang="scss">

</style>
