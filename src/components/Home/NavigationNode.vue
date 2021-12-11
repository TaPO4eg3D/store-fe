<template lang="pug">
el-sub-menu(
  v-if="(category.children?.length || 0) > 0",
  :index="category.id.toString()",
)
  template(#title='')
    span {{ category.name }}
  node(
    v-for="child in category.children",
    :category="child"
  )
el-menu-item(
  v-else
  :index="category.id.toString()"
)
  router-link(:to="{ name: 'Category', params: { id: category.id } }") {{ category.name }}
</template>

<script lang="ts">
import { Category } from '@/common/interfaces/category'
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'node',
  data () {
    return {
      store: useStore()
    }
  },
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item::v-deep {
  height: 35px;
  line-height: 35px;
  &:hover {
    border-radius: 4px;
  }
  a {
    display: block;
    color: #303133;
  }
}
</style>
