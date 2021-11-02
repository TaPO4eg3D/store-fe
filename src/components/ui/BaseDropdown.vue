<template lang="pug">
el-dropdown.base-dropdown(
  trigger="click"
)
  span.el-dropdown-link {{ selectedValue.title }}
    el-icon.el-icon--right
      arrow-down
  template(#dropdown="")
    el-dropdown-menu
      el-dropdown-item(
        v-for="item in items"
        :command="item"
        @click="selectValue(item)"
      ) {{ item.title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Currency } from '@/common/interfaces/currency'

export default defineComponent({
  name: 'BaseDropdown',
  props: {
    items: {
      type: Array,
      default () { return [] }
    },
    initialValue: {
      type: Object,
      default () { return {} }
    }
  },
  emits: ['selected'],
  data () {
    return {
      selectedValue: {}
    }
  },
  watch: {
    initialValue: {
      handler (value) {
        console.log('initialValue', value)
        this.selectedValue = value
      }
    }
  },
  methods: {
    selectValue (value: Currency) {
      this.selectedValue = value
      this.$emit('selected', value)
    }
  }
})
</script>

<style lang="scss" scoped>
.base-dropdown {
  .el-dropdown-selfdefine {
    background: #f5f5f5;
    border: 1px solid #DDDDDD;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: #fff;
      border-color: #ccc;
    }
  }
}
</style>
