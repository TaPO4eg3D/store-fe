<template lang="pug">
el-dialog(
  :model-value="isVisible",
  :title="product?.name",
  width="50%",
  @closed="handleClose()",
)
  .product-dialog
    .product-dialog__preview
      img(:src="product.preview_image")
    .product-dialog__info
      .product-dialog__price.price
        i18n-n.price__original(
          v-if="product.discount_price"
          tag="div"
          :value="+product.price * GetCurrencyRate()"
          format="currency"
          :locale="GetCurrentCurrency()"
        )
        div.price__discount
          i18n-n(
            tag="span"
            :value="(+product.discount_price || +product.price) * GetCurrencyRate()"
            format="currency"
            :locale="GetCurrentCurrency()"
          )
          span(v-if="productOptionsRef?.resultingPrice") +
          i18n-n(
            v-if="productOptionsRef?.resultingPrice"
            tag="span"
            :value="+productOptionsRef?.resultingPrice * GetCurrencyRate()"
            format="currency"
            :locale="GetCurrentCurrency()"
          )
      .product-dialog__description {{ product.description }}
      .product-dialog__options
        product-options(
          ref="productOptionsRef",
          :sections="product.additional_options || []"
        )
  template(#footer)
    .product-dialog__footer.footer
      el-input-number.footer__input(
        v-model="productAmount",
        :min="1"
      )
      el-button.footer__buy(
        type="primary",
        plain,
        :disabled="!productOptionsRef?.isValid ?? true",
        @click="addCartItem()"
      ) {{ $t('product.add_to_cart') }}
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Product } from '@/common/interfaces/product'
import {
  defineComponent,
  PropType,
  Ref,
  ref,
  watch
} from 'vue'

import { useStore } from 'vuex'

import ProductOptions from '@/components/ProductOptions/ProductOptions.vue';
import { CartItem } from '@/store/interfaces/cart-item';

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  components: {
    ProductOptions
  },
  setup (props) {
    const store = useStore()
    const productAmount = ref(1)

    const productOptionsRef: Ref<typeof ProductOptions | null> = ref(null)

    const handleClose = () => {
      productAmount.value = 1
      store.dispatch('setProductDialogVisibility', false)
    }

    const addCartItem = () => {
      const productPrice = +(props.product.discount_price || props.product.price);

      store.dispatch('addCartItem', {
        product: props.product,
        amount: productAmount.value,
        additionalOptions: JSON.parse(JSON.stringify(Array.from(productOptionsRef.value?.selectedElements))),
        additionalOptionsMeta: JSON.parse(JSON.stringify(productOptionsRef.value?.selectedElementsAdditionOptions)),
        price: productPrice + (+(productOptionsRef.value?.resultingPrice || 0)),
      } as CartItem)
    }

    return {
      productOptionsRef,
      productAmount,
      handleClose,
      addCartItem
    }
  }
})
</script>

<style lang="scss" scoped>
.product-dialog {
  display: grid;
  grid-template-columns: .5fr 1.5fr;
  grid-gap: 15px;
  &__preview {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
  &__info {
    padding: 30px;
  }
  &__description {
    margin-top: 20px;
  }
}

.price {
  font-size: 22px;
  font-weight: 750;
  &__original {
    color: red;
    font-size: 24px;
    font-weight: 100;

    text-decoration: line-through;

    margin-bottom: 10px;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  grid-gap: 20px;
}

.product-dialog .options {
  margin-top: 20px;
}

.product-dialog .product-description {
  margin-top: 20px;
}

@include _767 {
  .product-dialog {
    grid-template-columns: 1fr;
    grid-gap: 0;
    &__info {
      padding: 0;
    }
  }

  .price {
    font-size: 20px;
    &__original {
      font-size: 20px;
      margin-bottom: 0;
    }
  }
}

@include _575 {
  .product-dialog {
    &__preview img {
      width: 150px;
      height: 150px;
    }
  }
}

@include _480 {
  .footer {
    flex-direction: column;
    grid-gap: 10px;

    &__input {
      width: 100%;
    }
  }
}
</style>
