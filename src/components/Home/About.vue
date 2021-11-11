<template lang="pug">
.about
  h2.about__title {{ title }}
  .about__items
    about-item(
      v-for="(item, i) in items"
      :key="`about__item-${i}`"
      :item="item"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AboutItem from '@/components/Home/AboutItem.vue'

export default defineComponent({
  name: 'About',
  components: {
    AboutItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () { return [] }
    }
  }
})
</script>

<style lang="scss" scoped>
.about {
  &__title {
    font-weight: normal;
    text-align: center;
    margin-bottom: 20px;
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}
</style>
