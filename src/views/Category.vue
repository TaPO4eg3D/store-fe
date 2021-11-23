<template lang="pug">
.category
  base-breadcrumb
  h2.category__title {{ categoryName }}
  .category__content.divider
    .side-section
      product-filter.side-section__filter
      popular-products.side-section__popular
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

import GeneralCard from '@/components/GeneralCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue'

import ProductFilter from '@/components/Category/ProductFilter.vue'
import ProductDialog from '@/components/Category/ProductDialog.vue'
import PopularProducts from '@/components/Home/PopularProducts.vue'

import { Product } from '@/common/interfaces/product'
import { ListResponse } from '@/common/interfaces/list-response'
import { Category } from '@/common/interfaces/category'

export default defineComponent({
  components: {
    ProductFilter,
    ProductCard,
    GeneralCard,
    ProductDialog,
    PopularProducts,
    BaseBreadcrumb
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
  &__title {
    margin-bottom: 20px;
    font-weight: normal;
  }

  @include _575 {
    &__title {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
}

.product-list {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: $template-gap;

  .product-card {
    max-width: none;
  }

  @include _767 {
    grid-template-columns: repeat(2, 1fr);
  }

  @include _575 {
    grid-template-columns: 1fr;
    justify-content: center;
    grid-gap: $template-gap-adaptive;
  }
}

.empty-container {
  margin: 0 auto;
}

.side-section {
  display: flex;
  flex-direction: column;
  grid-gap: $template-gap;

  &__popular::v-deep {
    min-width: auto;
    .product-card {
      padding: 0;
      border: none;
      max-width: none;
    }
    @include _991 {
      min-width: 300px;
      .product-card {
        max-width: 220px;
      }
    }
  }
}
</style>
