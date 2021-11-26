<template lang="pug">
el-dialog(
  :title="$t('cart.title')",
  width="50%",
  :model-value="isVisible",
  :before-close="handleDialogClose",
)
  .cart-items(
    v-if="cartItems.length !== 0"
  )
    cart-item(
      v-for="cartItem, index in cartItems",
      :cartItem="cartItem",
      :itemIndex="index",
    )
  el-empty(
    v-else,
    :description="$t('cart.description_empty')",
  )

  .total-price Total price: {{ totalPrice }} руб.

  template(#footer="")
    span.dialog-footer
      el-button(
        @click="handleDialogClose()",
      ) {{ $t('cart.button_cancel') }}
      el-button(
        type="primary"
        @click="createOrder",
      ) {{ $t('cart.button_confirm') }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from 'vuex'

import CartItem from './CartItem.vue'

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean
    }
  },
  components: {
    CartItem
  },
  setup () {
    const store = useStore()

    const handleDialogClose = () => {
      store.dispatch('setCartDialogVisibility', false)
    }

    const createOrder = () => {
      store.dispatch('createOrder');
    };

    const cartItems = computed(() => {
      return store.state.cart;
    })

    const totalPrice = computed(() => {
      return store.getters.totalPrice
    })

    return {
      cartItems,
      totalPrice,
      handleDialogClose,
      createOrder,
    }
  }
})
</script>

<style lang="scss" scoped>
.cart-items {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.total-price {
  margin-top: 20px;
  font-weight: 600;
  font-size: 14px;

  text-align: right;
}
</style>
