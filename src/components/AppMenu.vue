<template lang="pug">
.app-menu
  navigation(:isHidden="false")
  search
  base-button(
    :title="$t('cart.title')",
    styles="plain",
    type="primary",
    size="large",
    :link="appLinks.SELL_TO_US"
  )
    span {{ $t('sell_to_us') }}
      el-icon
        top-right
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as constants from '@/common/constants'

import Navigation from '@/components/Home/Navigation.vue'
import Search from '@/components/Home/Search.vue'

export default defineComponent({
  name: 'AppMenu',
  components: {
    Navigation,
    Search
  },
  setup () {
    const appLinks = constants.LINKS
    return {
      appLinks
    }
  }
})
</script>

<style lang="scss" scoped>
.app-menu {
  display: grid;
  grid-template-columns: 1fr 2.5fr .5fr;
  grid-gap: 20px;
}
</style>
