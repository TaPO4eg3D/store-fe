<template lang="pug">
el-breadcrumb.base-breadcrumb(separator="/")
  el-breadcrumb-item(:to="{ path: '/' }") homepage
  el-breadcrumb-item
    a(href="/") qwer1
  el-breadcrumb-item qwer2
  el-breadcrumb-item qwer3
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseBreadcrumb'
})
</script>

<style lang="scss" scoped>
.base-breadcrumb {
}
</style>
