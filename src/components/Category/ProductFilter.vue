<template lang="pug">
general-card(
  :header="$t('filter.header')"
)
  .product-filter
    .filter.price-filter
      .title {{ $t('filter.type') }}
      el-slider(
        range,
        v-model="priceRange",
      )
    .apply-filters(style="margin-top: 20px")
      el-button(
        type="primary"
        plain
      ) {{ $t('filter.apply') }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import GeneralCard from '@/components/GeneralCard.vue'

export default defineComponent({
  components: {
    GeneralCard
  },
  setup () {
    const priceRange = ref([0, 5000])

    return {
      priceRange
    }
  }
})
</script>

<style lang="scss" scoped>
.product-filter {
  padding: 10px;
}

.product-filter .apply-filters {
  .el-button {
    width: 100%;
  }
}

.product-filter .price-filter {
  .title {
    position: relative;
    left: -10px;

    margin-bottom: 6px;
  }
}
</style>
