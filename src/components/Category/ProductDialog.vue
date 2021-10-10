<template lang="pug">
el-dialog(
  :model-value="isVisible",
  :title="product.name"
  width="40%"
)
  .product-dialog
    el-row(:gutter="30")
      el-col(:span="12")
        .product-preview
          img(:src="product.image")
      el-col(:span="12")
        .product-info
          .product-price
            .original-price(v-if="product.discount_price") {{ product.price }} руб.
            .price {{ product.discount_price || product.price }} руб.
          .product-description {{ product.description }}
  template(#footer)
    .product-dialog-footer
      el-input-number(
        v-model="productAmount",
        :min="1"
        style="margin-right: 20px"
      )
      el-button.buy-button(type="primary", plain) Add to cart
</template>

<script lang="ts">
import { Product } from '@/common/interfaces/product'
import {
    defineComponent,
    PropType,
    ref,
} from 'vue'

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object as PropType<Product>,
      required: true,
    }
  },
  setup() {
    const productAmount = ref(1);

    return {
      productAmount,
    }
  },
})
</script>

<style lang="scss">
.product-dialog .product-info {
  padding: 30px;
}

.product-dialog .product-preview {
  img {
    width: 100%;
  }
}

.product-dialog .product-price {
  font-size: 28px;

  .original-price {
    color: red;
    font-size: 24px;
    font-weight: 100;

    text-decoration: line-through;

    margin-bottom: 10px;
  }
}

.product-dialog .product-description {
  margin-top: 20px;
}

.product-dialog-footer {
  .buy-button {
    min-width: 120px;
  }
}
</style>
