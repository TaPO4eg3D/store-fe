<template lang="pug">
.about-item
  .about-item__img
    img(
      :src="require(`@/assets/img/about/${item.img}`)"
      alt="item-logo"
    )
  .about-item__title {{ item.title }}
  .about-item__description {{ item.description }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutItem',
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  }
})
</script>

<style lang="scss" scoped>
.about-item {
  padding: 10px 15px;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .10);
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__img img {
    width: 45px;
    height: 45px;
    opacity: .3;
  }
  &__title {
    font-size: 18px;
  }
  &__description {
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
  }
}
</style>
