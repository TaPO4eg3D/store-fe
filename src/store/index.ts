import { Product } from '@/common/interfaces/product'
import { createStore } from 'vuex'

import { ElNotification } from 'element-plus'

interface ProductDialog {
  show: boolean;
  product: Product | null;
}

interface CartItem {
  product: Product,
  amount: number,
}

export default createStore({
  state: {
    productDialog: {
      show: false,
      product: null,
    } as ProductDialog,
    cart: JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[],
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
    addCartItem(state, cartItem: CartItem) {
      state.cart.push(cartItem);

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCartItem(state, productId: number) {
      state.cart = state.cart.reduce((acc: CartItem[], cartItem: CartItem) => {
        if (cartItem.product.id != productId) {
          acc.push(cartItem);
        }
        return acc;
      }, [] as CartItem[])

      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    itemsInCart: state => {
      return state.cart.reduce((acc: number, cartItem: CartItem) => {
        acc += cartItem.amount;
        return acc;
      }, 0)
    },
  },
  actions: {
    setDialogProduct(context, product: Product) {
      context.commit('setDialogProduct', product);
      context.commit('setProductDialogVisibility', true);
    },
    setProductDialogVisibility(context, isVisible: boolean) {
      context.commit('setProductDialogVisibility', isVisible);
    },
    addCartItem(context, cartItem: CartItem) {
      ElNotification.success({
        title: 'Item has been added',
        message: `${cartItem.product.name} (x${cartItem.amount}) has been added to your cart`,
      });

      context.commit('addCartItem', cartItem);
    },
    removeCartItem(context, product: Product) {
      ElNotification.success({
        title: 'Item has been removed',
        message: `${product.name} has been removed from your cart`,
      });

      context.commit('removeCartItem', product.id);
    },
  },
  modules: {
  }
})
