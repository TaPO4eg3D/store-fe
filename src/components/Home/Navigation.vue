<template lang="pug">
.navigation-menu
  .navigation-menu__header {{ $t('catalog') }}
  el-menu.el-menu-vertical-demo(
    v-if="!isHidden"
  )
    navigation-node(
      v-for="category in categories",
      :key="category.id",
      :category="category",
    )
</template>

<script lang="ts">
import axios from 'axios'

import { defineComponent, onMounted, Ref, ref } from 'vue'

import { Category } from '@/common/interfaces/category'
import { ListResponse } from '@/common/interfaces/list-response'

import NavigationNode from '@/components/Home/NavigationNode.vue'

export default defineComponent({
  name: 'Navigation',
  props: {
    isHidden: {
      type: Boolean,
      default: true
    }
  },
  components: {
    NavigationNode
  },
  setup () {
    // const categories: Ref<Category[]> | Ref<never[]> = ref([])
    const categories = [
      {
        id: 0,
        name: 'qwer0'
      },
      {
        id: 1,
        name: 'qwer1'
      },
      {
        id: 2,
        name: 'qwer2'
      },
      {
        id: 3,
        name: 'qwer3'
      },
      {
        id: 4,
        name: 'qwer4'
      }
    ]

    onMounted(async () => {
      // TODO: Add an exception handling

      // const response = await axios.get<ListResponse<Category>>(
      //   '/api/categories/'
      // )
      // categories.value = response.data.results
    })

    return {
      categories
    }
  }
})
</script>

<style lang="scss" scoped>
.navigation-menu {
  position: relative;
  &__header {
    padding: 10px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #4E4E4E;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    border-radius: 4px 4px 0 0;
    z-index: 1001;
  }
}

.el-menu::v-deep {
  //border-right: none !important;
  position: absolute;
  width: 100%;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0 0 4px 4px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  li:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
  .el-menu-item {
    height: 35px;
    line-height: 35px;
    &:hover {
      border-radius: 4px;
    }
  }
}
</style>
