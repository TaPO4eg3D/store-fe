<template lang="pug">
el-row(:gutter="20")
  el-col.hidden-md-and-down(:span="5")
    navigation(:isHidden="true")
  el-col(:span="19")
    el-row(:gutter="20")
      search
      cart-button
el-row(style="margin-top: 25px")
  el-col
    h2 {{ categoryName }}
el-row(:gutter="20")
  el-col(:span="5")
    product-filter
    general-card.selling-hits(
      header="Хиты продаж",
      :isSlider="true",
      style="margin-top: 20px"
    )
      .splide__slide
        product-card(
          :product="testProduct"
        )
      .splide__slide
        product-card(
          :product="testProduct"
        )
      .splide__slide
        product-card(
          :product="testProduct"
        )
      .splide__slide
        product-card(
          :product="testProduct"
        )
  el-col(:span="19")
    .product-list
      product-dialog(
        :isVisible="true",
        :product="testProduct",
      )
      product-card(
        v-for="i in 4"
        :product="testProduct"
      )
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Navigation from '@/components/Home/Navigation.vue'
import Search from '@/components/Home/Search.vue'
import CartButton from '@/components/Home/CartButton.vue'

import GeneralCard from '@/components/GeneralCard.vue'

import ProductFilter from '@/components/Category/ProductFilter.vue'
import ProductCard from '@/components/ProductCard.vue'

import ProductDialog from '@/components/Category/ProductDialog.vue'

import { Product } from '@/common/interfaces/product'


export default defineComponent({
  components: {
    Navigation,
    Search,
    ProductFilter,
    CartButton,
    ProductCard,
    GeneralCard,
    ProductDialog,
  },
  setup() {
    const categoryName = ref('Buy: Test Category');

    // TODO: Delete
    const testProduct: Product = {
      image: 'https://os-market.store/image/cache/catalog/office2016/201910-pro-1-180x180.jpg',
      name: 'Test Product 1',
      description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      `,
      price: 1000,
      discountPrice: 2000,
    }

    return {
      categoryName,
      testProduct,
    }
  },
})
</script>

<style lang="scss">
.product-list {
  display: flex;
  flex-wrap: wrap;

  gap: 22px;

  .product-card {
    max-width: 248px;
  }
}
</style>