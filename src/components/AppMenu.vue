<template lang="pug">
.app-menu.divider
  navigation(
    :isHidden="isHiddenNavigation"
    @hidden-state="changeHiddenState"
  )
  .app-menu__right
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
import { LINKS } from '@/common/constants'

import Navigation from '@/components/Home/Navigation.vue'
import Search from '@/components/Home/Search.vue'

export default defineComponent({
  name: 'AppMenu',
  components: {
    Navigation,
    Search
  },
  data () {
    return {
      isHiddenNavigation: false
    }
  },
  computed: {
    currentPath () {
      return this.$route.path
    }
  },
  watch: {
    currentPath: {
      handler (value) {
        this.isHiddenNavigation = value !== '/'
      }
    }
  },
  mounted () {
    this.isHiddenNavigation = this.currentPath !== '/'
  },
  methods: {
    changeHiddenState (value: boolean) {
      this.isHiddenNavigation = value
    }
  },
  setup () {
    const appLinks = LINKS
    return {
      appLinks
    }
  }
})
</script>

<style lang="scss" scoped>
.app-menu {
  &__right {
    display: grid;
    grid-template-columns: 2.5fr .5fr;
    grid-gap: 20px;
  }
}
</style>
