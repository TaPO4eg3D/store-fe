import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './i18n'
import ElementPlus from 'element-plus'

import { 
  More,
  ShoppingCart,
  ShoppingCartFull,
} from '@element-plus/icons'

import 'keen-slider/keen-slider.min.css'
import 'element-plus/dist/index.css'

const app = createApp(App);

// Icons
app.component('more', More)
app.component('shopping-cart', ShoppingCart)
app.component('shopping-cart-full', ShoppingCartFull)

app.use(i18n)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
