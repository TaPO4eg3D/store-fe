<template lang="pug">
.cart-item
  .preview
    img(:src="cartItem?.product?.preview_image")
  .name {{ cartItem?.product?.name }}
  .quantiy
    el-input-number(
      v-model="productQuantity",
      :min="1",
    )
  .price
    strong {{ totalPrice }} руб.
  .control
    el-popconfirm(
      title="Are you sure that you want to delete that item?",
      @confirm="deleteCartItem()",
    )
      template(#reference)
        el-button(
          type="danger",
          icon="el-icon-delete",
        )
</template>

<script lang="ts">
import { useStore } from 'vuex'

import { defineComponent, PropType, ref, computed, watch } from 'vue'

import type { CartItem } from '@/store/interfaces/cart-item'

export default defineComponent({
  props: {
    cartItem: {
      type: Object as PropType<CartItem>
    }
  },
  setup (props) {
    const store = useStore()

    const productQuantity: any = computed({
      set (value: number): void {
        store.dispatch('setCartItemAmount', {
          productId: props.cartItem?.product.id,
          amount: value
        })
      },
      get (): number {
        return props.cartItem?.amount || 1
      }
    })

    const totalPrice = computed(() => {
      const product = props.cartItem?.product

      if (!product) {
        return 0
      }

      const price = product.discount_price ||
        product.price

      return price * productQuantity.value
    })

    const deleteCartItem = () => {
      store.dispatch('removeCartItem', props.cartItem?.product)
    }

    return {
      totalPrice,
      deleteCartItem,
      productQuantity
    }
  }
})
</script>

<style lang="scss" scoped>
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
