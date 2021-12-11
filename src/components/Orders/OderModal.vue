<template lang="pug">
el-dialog(
  :model-value="isVisible",
  title="Order Products",
  width="50%",
)
  product-options-view-modal(
    :isVisible="isProductOptionsViewModalVisibe",
    :sections="selectedOrderProduct?.product?.additional_options || []",
    :selectedItems="selectedOrderProduct?.selected_items || []",
    :selectedItemsMeta="selectedOrderProduct?.selected_items_meta || []",
    @close="closeProductOptionsViewModal",
  )
  .order-modal-inner
    .order-product(
      v-for="orderProduct in orderProducts"
    )
      img.preview(
        :src="orderProduct.product.preview_image",
      )
      .product-name {{ orderProduct.product.name }}
      .description {{ orderProduct.product.description }}
      .amount {{ orderProduct.amount }}
      .price {{ displayPrice(orderProduct.price) }}
      el-button(
        type="primary",
        @click="openProductOptionsViewModal(orderProduct)"
      ).info ?
</template>

<script lang="ts">
import { OrderListProductItem } from '@/common/interfaces/order'
import { Product } from '@/common/interfaces/product';
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex';

import ProductOptionsViewModal from '@/components/ProductOptions/ProductOptionViewModal.vue';

export default defineComponent({
  props: {
    isVisible: {
      default: false,
      type: Boolean,
    },
    orderProducts: {
      type: Array as PropType<OrderListProductItem[]>
    }
  },
  components: {
    ProductOptionsViewModal,
  },
  setup() {
    const store = useStore();

    const selectedOrderProduct = ref();
    const isProductOptionsViewModalVisibe = ref(false);

    const displayPrice = (price: number) => {
      const currentCurrency = store.getters.getCurrentCurrency;
      const _price = +price * currentCurrency?.rate;

      return `${_price.toFixed(2)}${currentCurrency?.display}`;
    };

    const openProductOptionsViewModal = (orderProduct: OrderListProductItem) => {
      selectedOrderProduct.value = orderProduct;
      isProductOptionsViewModalVisibe.value = true;
    };

    const closeProductOptionsViewModal = () => {
      selectedOrderProduct.value = null;
      isProductOptionsViewModalVisibe.value = false;
    };

    return {
      selectedOrderProduct,
      isProductOptionsViewModalVisibe,

      displayPrice,

      openProductOptionsViewModal,
      closeProductOptionsViewModal,
    }
  },
})
</script>

<style lang="scss" scoped>
.order-modal-inner {
  padding: 30px;
}

.preview {
  max-height: 80px;
  max-width: 80px;
}

.order-product {
  margin-bottom: 30px;

  display: grid;

  row-gap: 10px;
  column-gap: 10px;

  grid-template-rows: 20px 1fr;
  grid-template-columns: 100px 1fr 40px 80px 50px;
}

.preview {
  grid-row: 1 / 2;
  grid-column: 1;
}

.product-name {
  font-weight: 800;

  grid-row: 1;
  grid-column: 2;
}

.description {
  grid-row: 2;
  grid-column: 2;

  font-size: 12px;
}

.amount {
  font-weight: 800;

  grid-row: 1 / 2;

  justify-self: center;
}

.price {
  font-weight: 800;
  grid-row: 1 / 2;

  align-self: center;
  justify-self: center;
}
</style>
