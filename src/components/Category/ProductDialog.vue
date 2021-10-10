<template lang="pug">
el-dialog(
  :model-value="isVisible",
  :title="product?.name",
  width="40%",
  @closed="handleClose()",
)
  .product-dialog
    el-row(:gutter="30")
      el-col(:span="12")
        .product-preview
          img(:src="product.preview_image")
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
    watch,
} from 'vue'

import { useStore } from 'vuex'

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
  setup(props) {
    const store = useStore();
    const productAmount = ref(1);

    const handleClose = () => {
      store.dispatch('setProductDialogVisibility', false);
    }

    return {
      productAmount,
      handleClose,
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
    height: auto;
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
