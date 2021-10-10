<template lang="pug">
.navigation_menu
  .header {{ $t('catalog') }}
  el-menu.el-menu-vertical-demo(
    v-if="!isHidden"
    @open='handleOpen',
    @close='handleClose',
  )
    navigation-node(
      v-for="category in categories",
      :key="category.id",
      :category="category",
    )
</template>

<script lang="ts">
import axios from 'axios';

import { defineComponent, onMounted, Ref, ref } from 'vue';

import { Category } from '@/common/interfaces/category';
import { ListResponse } from '@/common/interfaces/list-response';

import NavigationNode from '@/components/Home/NavigationNode.vue'

export default defineComponent({
  name: 'Navigation',
  props: {
    isHidden: {
      type: Boolean,
      default: true
    },
  },
  components: {
    NavigationNode,
  },
  setup() {
    const categories: Ref<Category[]> | Ref<never[]> = ref([]); 

    onMounted(async () => {
      // TODO: Add an exception handling

      const response = await axios.get<ListResponse<Category>>(
        '/api/categories/'
      );
      categories.value = response.data.results;
    });

    return {
      categories,
    }
  }
})
</script>

<style lang="scss">
.navigation_menu .header {
  padding: 10px;
  font-weight: bold;

  color: #fff;
  text-align: center;
  background-color: #4E4E4E;
}

.el-menu {
  border-right: none !important;
}
</style>
