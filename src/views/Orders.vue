<template lang="pug">
.orders
  order-modal(
    :isVisible="isModalVisible",
    :orderProducts="selectedOrder?.order_products || []",
    @close="closeOrderModal",
  )
  el-table(
    :data="orders",
    stipe,
    style="width: 100%",
  )
    el-table-column(
      label="#"
      prop="id",
      width="100"
    )
    el-table-column(
      label="Products",
    )
      template(#default="scope")
        .show-products
          el-button(
            type="primary",
            @click="openOrderModal(scope.row.id)",
          ) Show products
    el-table-column(
      label="Created"
      width="200"
    )
      template(#default="scope")
          div {{ getDate(scope.row.created_at) }}
    el-table-column(
      label="Total price"
      prop="price",
      width="200"
    )
    el-table-column(
      label="Payed"
      prop="is_payed",
      width="100"
    )
      template(#default="scope")
        el-checkbox(:model-value="scope.row.is_payed", disabled)
    el-table-column(
      label="Options",
      width="120"
    )
      template(#default="scope")
        .show-products
          el-button(type="danger") Delete
</template>

<script lang="ts">
import axios from 'axios';

import { defineComponent, onMounted, Ref, ref } from 'vue';

import { OrderListItem  } from '@/common/interfaces/order';
import { ListResponse } from '@/common/interfaces/list-response';

import OrderModal from '@/components/Orders/OderModal.vue';

export default defineComponent({
  components: {
    OrderModal,
  },
  setup() {
    const isModalVisible = ref(false);
    const selectedOrder: Ref<OrderListItem | undefined> = ref();

    const currentPage: Ref<number> = ref(1);
    const pageSize: Ref<number> = ref(20);

    const orders: Ref<OrderListItem[]> = ref([]);
    const totalOrders: Ref<number> = ref(0);

    const getOrders = async (page: number) => {
      // TODO: Add authentification
      const params = {
        limit: pageSize.value,
        offset: pageSize.value * (page - 1),
      };

      const response = await axios.get<ListResponse<OrderListItem>>('/api/orders/', { params });
      const data = response.data;

      orders.value = data.results;
      totalOrders.value = data.count;
    };

    const openOrderModal = (orderId: number) => {
      const order = orders.value.find(order => order.id === orderId);

      selectedOrder.value = order;
      isModalVisible.value = true;
    };

    const closeOrderModal = () => {
      selectedOrder.value = undefined;
      isModalVisible.value = false;
    };

    const getDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    onMounted(async () => {
      await getOrders(currentPage.value);
    });

    return {
      orders,
      totalOrders,
      currentPage,
      pageSize,

      selectedOrder,
      isModalVisible,

      getOrders,
      getDate,

      openOrderModal,
      closeOrderModal,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>