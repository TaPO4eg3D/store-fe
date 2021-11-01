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
      v-for="cartItem in cartItems",
      :cartItem="cartItem",
    )
  el-empty(
    v-else,
    :description="$t('cart.description_empty')",
  )

  template(#footer="")
    span.dialog-footer
      el-button(
        @click="handleDialogClose()",
      ) {{ $t('cart.button_cancel') }}
      el-button(
        type="primary"
        ) {{ $t('cart.button_confirm') }}
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
