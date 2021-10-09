<template lang="pug">
.product-card
  .discount-label(v-if="discountTag !== 0") - {{ discountTag }}%
  img.picture(:src="product.image", draggable="false")
  a.title(href="#") {{ product.name }}
  .price-section
    .original-price(v-if="discountPrice") {{ price }} руб.
    .price {{ discountPrice || price }} руб.
  .control
    el-button-group(style="display: flex")
      el-button.buy-button
        .text-wrapper
          el-icon
            shopping-cart-full
          .text Buy
      el-button
        .text-wrapper
          el-icon
            more
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { Product } from '@/common/interfaces/product'

export default defineComponent({
  props: {
    price: Number,
    discountPrice: Number,
    product: {
      type: Object as PropType<Product>,
      requred: true,
    }
  },
  setup(props) {
    const discountTag = computed(() => {
      if (!props.discountPrice || !props.price) {
        return 0
      }

      return 100 - (props.discountPrice / props.price * 100)
    })

    return {
      discountTag,
    }
  },
})
</script>

<style lang="scss">
.product-card {
  position: relative;
  max-width: 210px;
}

.product-card .discount-label {
  color: white;
  position: absolute;
  padding: 4px 8px;

  background-color: rgba(#000, 0.7);
}

.product-card .picture {
  user-select: none;
}

.product-card .title {
  color: #000;
  text-decoration: none;
}

.product-card .price-section {
  display: flex;
  align-items: center;

  margin-top: 12px;

  font-size: 18px;
  font-weight: 800;

  .original-price {
    color: red;
    text-decoration: line-through;

    font-size: 16px;
    font-weight: 100;
  }

  .price {
    margin-left: auto;
  }
}

.control {
  margin-top: 20px;
}

.control .buy-button {
  width: 100%;

  .text-wrapper {
    justify-content: center;
  }
}

.control .text-wrapper {
  display: flex;
}

.control .text {
  margin-left: 2px;
}
</style>