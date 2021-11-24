<template lang="pug">
.cart-item
  .cart-item__left
    .preview
      img(:src="cartItem?.product?.preview_image")
    .name {{ cartItem?.product?.name }}
  .cart-item__right
    .quantiy
      el-input-number(
        v-model="productQuantity",
        :min="1",
      )
    .price
      strong
        i18n-n(
          tag="span"
          :value="+totalPrice * GetCurrencyRate()"
          format="currency"
          :locale="GetCurrentCurrency()"
        )
    .control
      el-popconfirm(
        :title="$t('cart.delete')",
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  &__left {
    display: flex;
    grid-gap: 10px;
    align-items: center;
  }

  &__right {
    display: flex;
    grid-gap: 10px;
    justify-content: space-between;
    align-items: center;
  }

  border-radius: 10px;

  padding: 15px;
  border: 1px solid #e3e3e3;

  background-color: #F5F5F5;

  .preview img {
    width: 80px;
    height: 80px;
  }

  .control {
    display: flex;
    justify-content: flex-end;
  }

  @include _1500 {
    grid-template-columns: 1fr;
  }

  @include _1199 {
    grid-template-columns: repeat(2, 1fr);
  }

  @include _991 {
    grid-template-columns: 1fr;
  }

  @include _575 {
    .preview img {
      width: 55px;
      height: 55px;
    }
  }
}
</style>
