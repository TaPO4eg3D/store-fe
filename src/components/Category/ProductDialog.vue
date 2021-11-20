<template lang="pug">
el-dialog(
  :model-value="isVisible",
  :title="product?.name",
  width="50%",
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
            .price {{ product.discount_price || product.price }} руб. + {{ productOptionsRef?.resultingPrice }} руб.
          .product-description {{ product.description }}
          .options
            product-options(
              ref="productOptionsRef",
              :sections="product.additional_options || []"
            )
  template(#footer)
    .product-dialog-footer
      el-input-number(
        v-model="productAmount",
        :min="1"
        style="margin-right: 20px"
      )
      el-button.buy-button(
        type="primary",
        plain,
        :disabled="!productOptionsRef?.isValid ?? true",
        @click="addCartItem()",
      ) Add to cart
</template>

<script lang="ts">
import { Product } from '@/common/interfaces/product'
import {
  defineComponent,
  PropType,
  Ref,
  ref,
  watch
} from 'vue'

import { useStore } from 'vuex'

import ProductOptions from '@/components/ProductOptions/ProductOptions.vue';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object as PropType<Product>,
      required: true
    },
  },
  components: {
    ProductOptions,
  },
  setup(props) {
    const store = useStore();
    const productAmount = ref(1);

    const productOptionsRef: Ref<typeof ProductOptions | null> = ref(null);

    const handleClose = () => {
      productAmount.value = 1
      store.dispatch('setProductDialogVisibility', false)
    }

    const addCartItem = () => {
      store.dispatch('addCartItem', {
        product: props.product,
        amount: productAmount.value
      })
    }

    return {
      productOptionsRef,
      productAmount,
      handleClose,
      addCartItem,
    }
  }
})
</script>

<style lang="scss" scoped>
.product-dialog .product-info {
  padding: 30px;
}

.product-dialog .product-preview {
  max-width: 400px;

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
