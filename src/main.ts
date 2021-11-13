import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './i18n'
import ElementPlus from 'element-plus'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'

import {
  More,
  MoreFilled,
  Delete,
  ShoppingCart,
  ArrowDown,
  ArrowLeftBold,
  ArrowRightBold,
  ShoppingCartFull,
  TopRight
} from '@element-plus/icons'

import '@splidejs/splide/dist/css/splide-core.min.css'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/display.css'

import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'TODO'

const app = createApp(App)

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1600,
  slg: 1800
}
app.provide('breakpoints', breakpoints)

// Components
app.component('base-button', BaseButton)
app.component('base-dropdown', BaseDropdown)

// Icons
app.component('more', More)
app.component('more-filled', MoreFilled)
app.component('delete', Delete)
app.component('shopping-cart', ShoppingCart)
app.component('shopping-cart-full', ShoppingCartFull)

app.component('arrow-left-bold', ArrowLeftBold)
app.component('arrow-right-bold', ArrowRightBold)
app.component('arrow-down', ArrowDown)
app.component('top-right', TopRight)

app.use(i18n)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
