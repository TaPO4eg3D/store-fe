<template lang="pug">
.navigation-menu
  .navigation-menu__header(
    :class="{'navigation-menu__header_hidden': isHiddenState}"
    @click="changeHiddenState"
    ) {{ $t('catalog') }}
    el-icon
      more-filled
  el-menu.el-menu-vertical-demo(
    v-if="!isHiddenState"
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
      default: false
    },
    isDesktop: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NavigationNode
  },
  emits: ['hidden-state'],
  data () {
    return {
      isHiddenState: false
    }
  },
  watch: {
    isHidden: {
      handler (value) {
        this.isHiddenState = value
      }
    }
  },
  methods: {
    changeHiddenState () {
      if (this.$route.path !== '/' || (this.$route.path === '/' && !this.isDesktop)) {
        this.isHiddenState = !this.isHiddenState
        this.$emit('hidden-state', this.isHiddenState)
      }
    }
  },
  setup () {
    // const categories: Ref<Category[]> | Ref<never[]> = ref([])
    const categories = ref()

    onMounted(async () => {
      // TODO: Add an exception handling

      const response = await axios.get<ListResponse<Category>>(
        '/api/categories/'
      )
      categories.value = response.data.results
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
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    background-color: #4E4E4E;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    border-radius: 4px 4px 0 0;
    z-index: 1001;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    &_hidden {
      border-radius: 4px;
    }
  }
}

.el-menu::v-deep {
  position: absolute;
  width: 100%;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0 0 4px 4px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  li:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
}
</style>
