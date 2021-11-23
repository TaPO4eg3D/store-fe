<template lang="pug">
el-dropdown.switch-locale(
  trigger="click"
)
  span.el-dropdown-link.title {{ currentLocale.code }}
    el-icon.el-icon--right
      arrow-down
  template(#dropdown="")
    el-dropdown-menu
      el-dropdown-item.item(
        v-for="(lang, i) in locales"
        :key="`lang-${i}`"
        :command="lang"
        @click="selectLocale(lang)"
      )
        span.item__symbol {{ lang.code }}
        span {{ lang.name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LOCALES } from '@/common/constants'
import { useStore, mapGetters } from 'vuex'
import { Locale } from '@/common/interfaces/locale'

export default defineComponent({
  name: 'SwitchLocale',
  computed: {
    ...mapGetters({
      currentLocale: 'getCurrentLocale'
    }),
    defaultLocale () {
      return LOCALES.find((item) => item.code === this.$i18n.locale)
    }
  },
  data () {
    return {
      locales: LOCALES,
      store: useStore()
    }
  },
  mounted () {
    this.setCurrentLocale()
  },
  methods: {
    setCurrentLocale () {
      const local = localStorage.getItem('locale')
      if (local === null) {
        this.store.commit('setCurrentLocale', this.defaultLocale)
      } else {
        this.store.commit('setCurrentLocale', JSON.parse(local))
        this.$i18n.locale = JSON.parse(local).code
      }
    },
    selectLocale (lang: Locale) {
      this.$i18n.locale = lang.code
      this.store.commit('setCurrentLocale', lang)
    }
  }
})
</script>

<style lang="scss" scoped>
.switch-locale {
  .el-dropdown-selfdefine {
    background: #f5f5f5;
    border: 1px solid #DDDDDD;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: #fff;
      border-color: #ccc;
    }
  }
  .title {
    text-transform: uppercase;
    display: flex;
    grid-gap: 5px;
  }
}

.item {
  display: flex;
  grid-gap: 10px;
  &__symbol {
    text-transform: uppercase;
    color: #919191;
  }
}
</style>
