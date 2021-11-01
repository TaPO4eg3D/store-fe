<template lang="pug">
el-dropdown.base-dropdown(
  trigger="click"
  @command="handleCommand"
)
  span.el-dropdown-link selected
    el-icon.el-icon--right
      arrow-down
  template(#dropdown="")
    el-dropdown-menu
      el-dropdown-item(
        v-for="item in items"
        :command="item.title"
      ) {{ item.title }}
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BaseDropdown',
  props: {
    items: {
      type: Array,
      default () { return [] }
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props) {
    let selectedValue = ''
    // watch(
    //   () => props.value,
    //   (selectedValue, prevSelectedValue) => {
    //     console.log('changing')
    //   }
    // )
    const handleCommand = (command: string) => {
      console.log(`${command}`)
      selectedValue = command
      // this.$emit('input', command)
    }
    return {
      selectedValue,
      handleCommand
    }
  }
})
</script>

<style lang="scss" scoped>
.base-dropdown {

}
</style>
