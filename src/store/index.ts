import { createStore } from 'vuex'

import { ElNotification } from 'element-plus'

import type { Product } from '@/common/interfaces/product'
import type { CartDialog } from './interfaces/cart-dialog'
import type { ProductDialog } from './interfaces/product-dialog'
import type { CartItem } from './interfaces/cart-item'
import type { Cart } from './interfaces/cart'
import { createInterpolation } from '@vue/compiler-core'

export default createStore({
  state: {
    productDialog: {
      show: false,
      product: null,
    } as ProductDialog,
    cartDialog: {
      show: false,
    } as CartDialog,
    cart: JSON.parse(
      localStorage.getItem('cart') || '{}'
    ) as Cart,
  },
  mutations: {
    setProductDialogVisibility(state, isVisible: boolean) {
      state.productDialog = {
        ...state.productDialog,
        show: isVisible,
      }
    },
    setCartDialogVisibility(state, isVisible: boolean) {
      state.cartDialog = {
        ...state.cartDialog,
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
      // If a product is in already in the cart, than just
      // increase an amount in the cart

      if (cartItem.product.id in state.cart) {
        const existedItem = state.cart[cartItem.product.id]

        state.cart[cartItem.product.id] = {
          ...existedItem,
          amount: existedItem.amount + cartItem.amount,
        };
      } else {
        state.cart[cartItem.product.id] = {
          ...cartItem,
        };
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCartItem(state, productId: number) {
      delete state.cart[productId];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    itemsInCart: state => {
      return Object.values(state.cart).reduce((acc: number, cartItem: CartItem) => {
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
    setCartDialogVisibility(context, isVisible: boolean) {
      context.commit('setCartDialogVisibility', isVisible);
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
