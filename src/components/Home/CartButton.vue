<template lang="pug">
// Cart section
el-badge.cart-button(:value="itemsInCart")
  el-button(
    plain,
    type="primary",
    size="large",
    @click="openCartDialog()",
  )
    el-icon
      shopping-cart
    | {{ $t('cart.title') }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
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
  width: 100%;
  min-width: 150px;
  .el-button span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-icon {
    margin-right: 4px;
  }

  button {
    width: 100%;
  }
}
</style>
