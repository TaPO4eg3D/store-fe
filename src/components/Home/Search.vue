<template lang="pug">
el-col(:span="20")
  el-input(
    prefix-icon="el-icon-search",
    :placeholder="$t('product_search_placeholder')",
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>
