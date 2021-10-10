<template lang="pug">
// Cart section
el-col(:span="4")
  el-badge.cart-button.item(:value="itemsInCart")
    el-button(
      plain,
      type="primary",
      size="large",
    )
      el-icon
        shopping-cart
      | {{ $t('cart') }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      itemsInCart: computed(() => store.getters.itemsInCart),
    }
  },
})
</script>

<style lang="scss">
.cart-button {
  width: 100%;

  .el-icon {
    margin-right: 4px;
  }

  button {
    width: 100%;
  }
}
</style>
