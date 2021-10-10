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
  el-col(:span="19")
    .product-list
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

    return {
      categoryName,
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