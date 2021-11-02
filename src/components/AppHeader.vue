<template lang="pug">
.app-header
  .app-header__container
    base-dropdown(
      :items="currencies"
      :initial-value="selectedCurrency"
      @selected="handleSelectCurrency"
    )
    .app-header__right
      cart-button
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import CartButton from '@/components/Home/CartButton.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import { Currency } from '@/common/interfaces/currency'

export default defineComponent({
  name: 'AppHeader',
  components: {
    BaseDropdown,
    CartButton
  },
  watch: {
    currencies: {
      handler () {
        this.selectedCurrency = this.currentCurrency
      }
    }
  },
  setup () {
    const store = useStore()
    let selectedCurrency = {}

    const handleSelectCurrency = (value: Currency) => {
      selectedCurrency = value
      store.commit('setCurrentCurrency', value)
    }

    return {
      selectedCurrency,
      handleSelectCurrency,
      currencies: computed(() => store.getters.getCurrencies),
      currentCurrency: computed(() => store.getters.getCurrentCurrency)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  padding: 5px 0;
  top: 0;
  position: sticky;
  box-shadow: 0 0 16px rgba(38, 38, 38, 0.16);
  background: #FFFFFF;
  z-index: 500;
  &__container {
    @include container;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
