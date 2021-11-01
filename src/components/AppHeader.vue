<template lang="pug">
.app-header
  .app-header__container
    h1 {{ $t('title') }}
    base-dropdown(:items="currencies")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import BaseDropdown from '@/components/ui/BaseDropdown.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    BaseDropdown
  },
  props: {
    currencies: {
      type: Array,
      default () { return [] }
    }
  },
  setup () {
    const select = ''

    return {
      select
    }
  }
})
</script>

<style lang="scss">
.app-header {
  top: 0;
  position: sticky;
  box-shadow: 0 0 16px rgba(38, 38, 38, 0.16);
  background: #FFFFFF;
  z-index: 500;
  &__container {
    @include container;
    margin: 0 auto;
  }
}
</style>
