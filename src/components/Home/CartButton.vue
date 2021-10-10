<template lang="pug">
// Cart section
el-col(:span="4")
  el-badge.cart-button.item(:value="12")
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
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
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
