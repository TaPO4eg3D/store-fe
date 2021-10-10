<template lang="pug">
.product-card
  .discount-label(v-if="discountTag !== 0") - {{ discountTag }}%
  img.picture(:src="product.preview_image", draggable="false")
  .title(href="#") {{ product.name }}
  .price-section
    .original-price(v-if="product.discount_price") {{ product.price }} руб.
    .price {{ product.discount_price || product.price }} руб.
  .control
    el-button-group(style="display: flex")
      el-button.buy-button(@click="addCartItem()")
        .text-wrapper
          el-icon
            shopping-cart-full
          .text Buy
      el-tooltip.item(
        effect="dark",
        content="Show additional information",
        placement="top-start",
      )
        el-button(@click="showProductDialog()")
          .text-wrapper
            el-icon
              more
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { useStore } from 'vuex'

import { Product } from '@/common/interfaces/product'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      requred: true,
    }
  },
  components: {
  },
  setup(props) {
    const store = useStore();

    const showProductDialog = () => {
      store.dispatch('setDialogProduct', props.product);
    };

    const addCartItem = () => {
      store.dispatch('addCartItem', {
        product: props.product,
        amount: 1,
      });
    }

    const discountTag = computed(() => {
      if (!props.product?.discount_price || !props.product.price) {
        return 0
      }

      return 100 - (props.product.discount_price / props.product.price * 100)
    })

    return {
      discountTag,
      showProductDialog,
      addCartItem,
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

  width: 100%;
  height: auto;

  object-fit: contain;

  margin-bottom: 20px;
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