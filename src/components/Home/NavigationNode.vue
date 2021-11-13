<template lang="pug">
el-sub-menu(
  v-if="category.child",
  :index="category.id.toString()",
)
  template(#title='')
    span {{ category.name }}
  node(:category="category.child")
el-menu-item(
  v-if="!category.child",
  :index="category.id.toString()"
)
  router-link(
    :to="{ name: 'Category', params: { id: category.id } }"
  ) {{ category.name }}
</template>

<script lang="ts">
import { Category } from '@/common/interfaces/category'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'node',
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true
    }
  },
  setup (props) {
    // console.log(props.category.id)
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item::deep {
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
