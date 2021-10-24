<template lang="pug">
el-dialog(
  v-model="isVisible",
  title="Cart",
  width="50%",
  :before-close="handleDialogClose"
)
  .cart-items(
    v-if="cartItems.length !== 0"
  )
    cart-item(
      v-for="cartItem in cartItems",
      :cartItem="cartItem",
    )
  el-empty(
    v-else,
    description="No items in your cart",
  )

  template(#footer="")
    span.dialog-footer
      el-button(
        @click="handleDialogClose()",
      ) Cancel
      el-button(type="primary") Confirm
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from 'vuex';

import CartItem from './CartItem.vue';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
    },
  },
  components: {
    CartItem,
  },
  setup() {
    const store = useStore();

    const handleDialogClose = () => {
      store.dispatch('setCartDialogVisibility', false);
    };

    const cartItems = computed(() => {
      return Object.values(store.state.cart);
    })

    return {
      cartItems,
      handleDialogClose,
    }
  },
});
</script>

<style lang="scss" scoped>
.cart-items {
  display: flex;
  flex-direction: column;

  gap: 20px;
}
</style>