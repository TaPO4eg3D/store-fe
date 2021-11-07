<template lang="pug">
// Cart section
el-badge.cart-button(:value="itemsInCart")
  base-button(
    :title="$t('cart.title')",
    styles="plain",
    type="primary",
    size="large",
    @click="openCartDialog()"
  )
    el-icon
      shopping-cart
    | {{ $t('cart.title') }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CartButton',
  setup () {
    const store = useStore()

    const openCartDialog = () => {
      store.dispatch('setCartDialogVisibility', true)
    }

    return {
      openCartDialog,
      itemsInCart: computed(() => store.getters.itemsInCart)
    }
  }
})
</script>

<style lang="scss" scoped>
.cart-button {
}
</style>
