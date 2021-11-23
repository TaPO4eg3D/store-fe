<template lang="pug">
el-breadcrumb.base-breadcrumb(separator="/")
  el-breadcrumb-item(:to="{ path: '/' }")
    router-link(
      :to="{ name: 'Home' }"
    ) {{ $t('breadcrumb.homepage') }}
  el-breadcrumb-item {{ routeTitle }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'BaseBreadcrumb',
  computed: {
    ...mapGetters({
      routeTitle: 'getRoute'
    })
  }
})
</script>

<style lang="scss" scoped>
.base-breadcrumb {
}
</style>
