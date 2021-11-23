<template lang="pug">
.product-card
  .discount-label(v-if="discountTag !== 0") - {{ discountTag }}%
  .picture
    img(:src="product.preview_image", draggable="false")
  .title(href="#") {{ product.name }}
  .price-section
    i18n-n.original-price(
      v-if="product.discount_price"
      tag="span"
      :value="+product.price"
      format="currency"
      :locale="GetCurrentCurrency()")
    i18n-n.price(
      tag="span"
      :value="+product.discount_price || +product.price"
      format="currency"
      :locale="GetCurrentCurrency()")
  .control
    el-button-group(style="display: flex")
      el-button.buy-button(@click="showProductDialog()")
        .text-wrapper
          el-icon
            shopping-cart-full
          .text {{ $t('product.buy') }}
      //- el-tooltip.item(
      //-   effect="dark",
      //-   content="Show additional information",
      //-   placement="top-start"
      //- )
      //-   el-button(@click="showProductDialog()")
      //-     .text-wrapper
      //-       el-icon
      //-         more
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { useStore } from 'vuex'

import { Product } from '@/common/interfaces/product'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const showProductDialog = () => {
      store.dispatch('setDialogProduct', props.product)
    }

    const addCartItem = () => {
      store.dispatch('addCartItem', {
        product: props.product,
        amount: 1
      })
    }

    const discountTag = computed(() => {
      if (!props.product?.discount_price || !props.product.price) {
        return 0
      }

      return Math.ceil(100 - (props.product.discount_price / props.product.price) * 100)
    })

    return {
      discountTag,
      showProductDialog,
      addCartItem
    }
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  max-width: 220px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: grid;
  grid-gap: 15px;

  .discount-label {
    color: white;
    position: absolute;
    padding: 4px 8px;

    background-color: rgba(#000, 0.7);
  }

  .picture {
    user-select: none;
    img {
      display: block;
      width: 190px;
      height: 190px;
      object-fit: cover;
      margin: 0 auto;
    }
  }

  .title {
    color: #000;
    text-decoration: none;
  }

  .price-section {
    display: flex;
    align-items: center;

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

  @include _575 {
    width: 100%;
    max-width: none;
  }
}

.product-card .control .buy-button {
  width: 100%;

  .text-wrapper {
    justify-content: center;
  }
}

.product-card .control .text-wrapper {
  display: flex;
}

.product-card .control .text {
  margin-left: 2px;
}
</style>
