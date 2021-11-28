<template lang="pug">
app-header
.app-content
  app-menu
  product-dialog(
    :isVisible="showProductDialog",
    :product="dialogProduct",
  )
  cart-dialog(
    :isVisible="showCartDialog"
  )
  router-view
scroll-to-top
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import AppHeader from '@/components/AppHeader.vue'
import AppMenu from '@/components/AppMenu.vue'
import CartDialog from '@/components/Cart/CartDialog.vue'
import ProductDialog from '@/components/Category/ProductDialog.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppMenu,
    CartDialog,
    ProductDialog,
    ScrollToTop
  },
  setup () {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('fetchCurrencies');
    });

    return {
      showProductDialog: computed(() => store.state.productDialog.show),
      dialogProduct: computed(() => store.state.productDialog.product),

      showCartDialog: computed(() => {
        return store.state.cartDialog.show
      })
    }
  }
})
</script>

<style lang="scss">
// TODO: Extract most of this to a separate SCSS file

$breakpoints: (
  xs: 576px,
  sm: 768px,
  md: 992px,
  lg: 1200px,
  xlg: 1600px,
  slg: 1800px,
);

// Respond above.
@mixin respond-above($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    @media (min-width: $breakpoint-value) {
      @content;
    }

  } @else {

    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}

// Respond below
@mixin respond-below($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    $breakpoint-value: map-get($breakpoints, $breakpoint);

    @media (max-width: ($breakpoint-value - 1)) {
      @content;
    }

  } @else {

    @warn 'Invalid breakpoint: #{$breakpoint}.';
  }
}

#app {
  display: grid;
  grid-gap: $template-gap;
  margin-bottom: 20px;
}

.app-content {
  @include container;
  margin: 0 auto;
  display: grid;
  grid-gap: $template-gap;
}

@include _575 {
  #app,
  .app-content {
    grid-gap: $template-gap-adaptive;
  }
}

//@include respond-below(slg) {
//  #app {
//    margin: 60px 160px;
//  }
//}
//
//@include respond-below(xlg) {
//  #app {
//    margin: 60px 60px;
//  }
//}
//
//@include respond-below(xlg) {
//  #app {
//    margin: 40px 40px;
//  }
//}
</style>
