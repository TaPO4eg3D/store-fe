<template lang="pug">
.cart-item
  .preview
    img(:src="cartItem.product.preview_image")
  .name {{ cartItem.product.name }}
  .quantiy
    el-input-number(
      v-model="productQuanitity",
      :min="1",
    )
  .price
    strong 123 руб.
  .control
    el-button(
      type="danger",
      icon="el-icon-delete",
    )
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'

import type { CartItem } from '@/store/interfaces/cart-item';

export default defineComponent({
  props: {
    cartItem: {
      type: Object as PropType<CartItem>
    }
  },
  setup(props) {
    const productQuanitity = ref(props.cartItem?.amount || 1);
    
    const totalPrice = computed(() => {
      const product = props.cartItem?.product;

      if (!product) {
        return 0;
      }

      const price = product.discount_price
        || product.price;

      return price * productQuanitity.value;
    })

    return {
      totalPrice,
      productQuanitity,
    }
  },
})
</script>

<style lang="scss">
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;

  padding: 15px;
  border: 1px solid #e3e3e3;

  background-color: #F5F5F5;

  .preview img {
    width: 80px;
    height: 80px;
  }

  .name {
    text-align: center;
    min-width: 200px;
    max-width: 200px;

    text-overflow: ellipsis;
  }
}
</style>
