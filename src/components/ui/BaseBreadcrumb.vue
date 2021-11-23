<template lang="pug">
el-breadcrumb.base-breadcrumb(separator="/")
  el-breadcrumb-item(:to="{ path: '/' }")
    router-link(
      :to="{ name: 'Home' }"
    ) {{ $t('breadcrumb.homepage') }}
  el-breadcrumb-item {{ secondLevel }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseBreadcrumb',
  props: {
    secondLevel: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.base-breadcrumb {
}
</style>
