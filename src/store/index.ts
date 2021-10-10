import { Product } from '@/common/interfaces/product'
import { createStore } from 'vuex'

interface ProductDialog {
  show: boolean;
  product: Product | null;
}

type Cart = Product[];

export default createStore({
  state: {
    productDialog: {
      show: false,
      product: null,
    } as ProductDialog,
    cart: [] as Cart,
  },
  mutations: {
    setProductDialogVisibility(state, isVisible: boolean) {
      state.productDialog = {
        ...state.productDialog,
        show: isVisible,
      }
    },
    setDialogProduct(state, product: Product) {
      state.productDialog = {
        ...state.productDialog,
        product,
      }
    },
    addCartItem(state, product: Product) {
      state.cart.push(product);
    },
    removeCartItem(state, productId: number) {
      state.cart = state.cart.reduce((acc, product) => {
        if (product.id != productId) {
          acc.push(product);
        }
        return acc;
      }, [] as Cart)
    }
  },
  actions: {
    setDialogProduct(context, product: Product) {
      context.commit('setDialogProduct', product);
      context.commit('setProductDialogVisibility', true);
    },
    setProductDialogVisibility(context, isVisible: boolean) {
      context.commit('setProductDialogVisibility', isVisible);
    }
  },
  modules: {
  }
})
