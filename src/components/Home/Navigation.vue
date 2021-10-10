<template lang="pug">
.navigation_menu
  .header {{ $t('catalog') }}
  el-menu.el-menu-vertical-demo(
    v-if="!isHidden"
    default-active='2',
    @open='handleOpen',
    @close='handleClose',
  )
    el-sub-menu(index='1')
      template(#title='')
        i.el-icon-location
        span Category 1
      el-menu-item-group(title='Group One')
        el-menu-item(index='1-1') Category 2
        el-menu-item(index='1-2') Category 3
      el-menu-item-group(title='Group Two')
        el-menu-item(index='1-3') Category 4
      el-sub-menu(index='1-4')
        template(#title='') Category 5
        el-menu-item(index='1-4-1') Category 6
    el-menu-item(index='2')
      i.el-icon-menu
      span Category 7
    el-menu-item(index='3' disabled='')
      i.el-icon-document
      span Category 8
    el-menu-item(index='4')
      i.el-icon-setting
      span Category 9
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',
  props: {
    isHidden: {
      type: Boolean,
      default: true
    },
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
