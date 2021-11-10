<template lang="pug">
.category
  app-menu
  h2.category__title {{ categoryName }}
  .category__content.divider
    div
      product-filter
      popular-products
    div
      .product-list
        .empty-container(
          v-if="products.length === 0",
        )
          el-empty(
            :description="$t('category.empty')"
          )
        product-card(
          v-for="product in products",
          :key="product.id",
          :product="product"
        )
</template>

<script lang="ts">
import axios from 'axios'

import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import Navigation from '@/components/Home/Navigation.vue'
import Search from '@/components/Home/Search.vue'

import AppMenu from '@/components/AppMenu.vue'
import GeneralCard from '@/components/GeneralCard.vue'

import ProductFilter from '@/components/Category/ProductFilter.vue'
import ProductCard from '@/components/ProductCard.vue'

import ProductDialog from '@/components/Category/ProductDialog.vue'
import PopularProducts from '@/components/Home/PopularProducts.vue'

import { Product } from '@/common/interfaces/product'
import { ListResponse } from '@/common/interfaces/list-response'
import { Category } from '@/common/interfaces/category'

export default defineComponent({
  components: {
    AppMenu,
    Navigation,
    Search,
    ProductFilter,
    ProductCard,
    GeneralCard,
    ProductDialog,
    PopularProducts
  },
  setup () {
    const route = useRoute()
    const categoryName = ref()

    const products: Ref<Product[]> = ref([])

    onMounted(async () => {
      const categoryID = route.params.id

      const responseCategory = await axios.get<Category>(`/api/categories/${categoryID}/`)
      const responseProduct = await axios.get<ListResponse<Product>>(`/api/products/?category=${categoryID}`)

      products.value = responseProduct.data.results
      categoryName.value = responseCategory.data.name
    })

    return {
      products,
      categoryName
    }
  }
})
</script>

<style lang="scss" scoped>
.category {
  display: grid;
  grid-gap: 20px;
  &__title {
    font-weight: normal;
  }
}

.product-list {
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  gap: 22px;

  .product-card {
    max-width: 248px;
  }
}

.empty-container {
  margin: 0 auto;
}
</style>
