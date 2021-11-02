import { createStore } from 'vuex'

import { ElNotification } from 'element-plus'

import type { Cart } from './interfaces/cart'
import type { CartItem } from './interfaces/cart-item'

import type { Product } from '@/common/interfaces/product'
import type { CartDialog } from './interfaces/cart-dialog'
import type { ProductDialog } from './interfaces/product-dialog'
import type { Currency } from '@/common/interfaces/currency'

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
      localStorage.getItem('cart') || '{}'
    ) as Cart,

    currencies: [] as Currency[],

    defaultCurrency: {} as Currency,

    currentCurrency: JSON.parse(
      localStorage.getItem('currency') || '{}'
    ) as Currency
  },
  mutations: {
    setProductDialogVisibility (state, isVisible: boolean) {
      state.productDialog = {
        ...state.productDialog,
        show: isVisible
      }
    },
    setCartDialogVisibility (state, isVisible: boolean) {
      state.cartDialog = {
        ...state.cartDialog,
        show: isVisible
      }
    },
    setDialogProduct (state, product: Product) {
      state.productDialog = {
        ...state.productDialog,
        product
      }
    },
    addCartItem (state, cartItem: CartItem) {
      // If a product is in already in the cart, than just
      // increase an amount in the cart

      if (cartItem.product.id in state.cart) {
        const existedItem = state.cart[cartItem.product.id]

        state.cart = {
          ...state.cart,
          [cartItem.product.id]: {
            ...existedItem,
            amount: existedItem.amount + cartItem.amount
          }
        }
      } else {
        state.cart = {
          ...state.cart,
          [cartItem.product.id]: {
            ...cartItem
          }
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCartItemAmount (state, { productId, amount }: { productId: number, amount: number }) {
      const cartItem = state.cart[productId]

      state.cart[productId] = {
        ...cartItem,
        amount
      }
    },
    removeCartItem (state, productId: number) {
      delete state.cart[productId]
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCurrencies (state, payload: { default: Currency, available: Currency[] }) {
      const currencies = [
        payload.default,
        ...payload.available
      ]
      currencies.forEach((item) => {
        // item.isDefault = item.code === payload.default.code
        item.title = item.code
      })

      state.currencies = currencies
    },
    setDefaultCurrency (state, defaultCurrency: Currency) {
      state.defaultCurrency = defaultCurrency
    },
    setCurrentCurrency (state, currentCurrency: Currency) {
      state.currentCurrency = Object.keys(state.currentCurrency).length === 0 ? state.defaultCurrency : currentCurrency
      localStorage.setItem('currency', JSON.stringify(state.currentCurrency))
    }
  },
  getters: {
    itemsInCart: state => {
      return Object.values(state.cart).reduce((acc: number, cartItem: CartItem) => {
        acc += cartItem.amount
        return acc
      }, 0)
    },
    getCurrencies: (state) => state.currencies,
    getDefaultCurrency: (state) => state.defaultCurrency,
    getCurrentCurrency: (state) => state.currentCurrency
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
      ElNotification.success({
        title: 'Item has been added',
        message: `${cartItem.product.name} (x${cartItem.amount}) has been added to your cart`
      })

      context.commit('addCartItem', cartItem)
    },
    removeCartItem (context, product: Product) {
      ElNotification.success({
        title: 'Item has been removed',
        message: `${product.name} has been removed from your cart`
      })

      context.commit('removeCartItem', product.id)
    },
    setCartItemAmount (context, { productId, amount }: {productId: number, amount: number}) {
      context.commit('setCartItemAmount', { productId, amount })
    },
    fetchCurrencies ({ commit }, payload) {
      commit('setCurrencies', payload)
    }
  },
  modules: {
  }
})
