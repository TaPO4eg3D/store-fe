import { createStore } from 'vuex'

import { ElNotification } from 'element-plus'

import { isEqual } from 'lodash';

import axios from 'axios';

import type { CartItem } from './interfaces/cart-item'

import type { Product } from '@/common/interfaces/product'
import type { CartDialog } from './interfaces/cart-dialog'
import type { ProductDialog } from './interfaces/product-dialog'
import type { Currency } from '@/common/interfaces/currency'
import type { Locale } from '@/common/interfaces/locale'
import type { Order } from '@/common/interfaces/order'

export default createStore({
  state: {
    productDialog: {
      show: false,
      product: null
    } as ProductDialog,

    cartDialog: {
      show: false
    } as CartDialog,

    cart: JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[],

    currencies: [] as Currency[],

    defaultCurrency: {} as Currency,

    currentCurrency: {} as Currency,

    currentLocale: {} as Locale
  },
  mutations: {
    setProductDialogVisibility (state, isVisible: boolean) {
      state.productDialog = {
        ...state.productDialog,
        show: isVisible
      };
    },
    setCartDialogVisibility (state, isVisible: boolean) {
      state.cartDialog = {
        ...state.cartDialog,
        show: isVisible
      };
    },
    setDialogProduct (state, product: Product) {
      state.productDialog = {
        ...state.productDialog,
        product
      };
    },
    clearCart (state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    addCartItem (state, cartItem: CartItem) {
      // If a product is in already in the cart (with matching options), than just
      // increase an amount in the cart

      const appendToCart = (): boolean => {
        const existingItems = state.cart.filter((_cartItem => {
          if (_cartItem.product.id === cartItem.product.id) {
            return true;
          }
        }));

        if (existingItems.length === 0) {
          return false;
        }

        for (const existingItem of existingItems) {
          if (!isEqual(existingItem.additionalOptions?.sort(), cartItem.additionalOptions?.sort())) {
            continue;
          }

          if (!isEqual(existingItem.additionalOptionsMeta, cartItem.additionalOptionsMeta)) {
            continue;
          }

          const index = state.cart.indexOf(existingItem);

          const newCart = [...state.cart];
          const oldItem = newCart[index];

          newCart.splice(index, 1, {
            ...oldItem,
            amount: oldItem.amount + cartItem.amount,
            price: cartItem.price,
          })

          state.cart = newCart;

          return true;
        }

        return false;
      }

      const appended = appendToCart();

      if (!appended) {
        state.cart = [
          ...state.cart,
          cartItem,
        ]
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCartItemAmount (state, { itemIndex, amount }: { itemIndex: number, amount: number }) {
      const item = {
        ...state.cart[itemIndex],
        amount
      };
      const newCart = [...state.cart];
      newCart.splice(itemIndex, 1, item);

      state.cart = newCart;

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeCartItem (state, itemIndex: number) {
      state.cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCurrencies (state, payload: { default: Currency, available: Currency[] }) {
      const currencies = [
        payload.default,
        ...payload.available
      ]
      currencies.forEach((item) => {
        item.title = item.code
      })

      state.currencies = currencies
    },
    setDefaultCurrency (state, defaultCurrency: Currency) {
      state.defaultCurrency = defaultCurrency
    },
    setCurrentCurrency (state, currentCurrency: Currency) {
      state.currentCurrency = currentCurrency
      localStorage.setItem('currency', JSON.stringify(state.currentCurrency))
    },
    setCurrentLocale (state, currentLocale: Locale) {
      state.currentLocale = currentLocale
      localStorage.setItem('locale', JSON.stringify(state.currentLocale))
    }
  },
  getters: {
    itemsInCart: state => {
      return state.cart.length;
    },
    totalPrice: state => {
      return state.cart.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.amount;
      }, 0)
    },
    getCurrencies: (state) => state.currencies,
    getDefaultCurrency: (state) => state.defaultCurrency,
    getCurrentCurrency: (state) => state.currentCurrency,
    getCurrentLocale: (state) => state.currentLocale
  },
  actions: {
    setDialogProduct (context, product: Product) {
      context.commit('setDialogProduct', product)
      context.commit('setProductDialogVisibility', true)
    },
    setProductDialogVisibility (context, isVisible: boolean) {
      context.commit('setProductDialogVisibility', isVisible)
    },
    setCartDialogVisibility (context, isVisible: boolean) {
      context.commit('setCartDialogVisibility', isVisible)
    },
    addCartItem (context, cartItem: CartItem) {
      context.commit('addCartItem', cartItem)

      ElNotification.success({
        title: 'Item has been added',
        message: `${cartItem.product.name} (x${cartItem.amount}) has been added to your cart`
      })
    },
    removeCartItem (context, itemIndex: number) {
      const cartItem = context.state.cart[itemIndex];
      context.commit('removeCartItem', itemIndex);

      ElNotification.success({
        title: 'Item has been removed',
        message: `${cartItem.product.name} has been removed from your cart`
      })
    },
    setCartItemAmount (context, { itemIndex, amount }: {itemIndex: number, amount: number}) {
      context.commit('setCartItemAmount', { itemIndex, amount })
    },
    fetchCurrencies ({ commit }, payload) {
      commit('setCurrencies', payload)
    },
    async createOrder({ state, commit } ) {
      const response = await axios.post('/api/orders', {
        items: state.cart.map((cartItem: CartItem) => {
          return {
            product_id: cartItem.product.id,
            amount: cartItem.amount,
            selected_items: cartItem.additionalOptions,
            selected_items_meta: cartItem.additionalOptionsMeta,
          }
        })
      } as Order);

      const data: any = response.data;
      
      commit('clearCart');
      window.location = data.url;
      
      return;
    },
  },
  modules: {
  }
})
