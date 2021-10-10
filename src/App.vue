<template lang="pug">
h1 Store!
product-dialog(
  :isVisible="showDialog",
  :product="dialogProduct",
)
router-view
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import ProductDialog from '@/components/Category/ProductDialog.vue'

export default defineComponent({
  components: {
    ProductDialog,
  },
  setup() {
    const store = useStore();

    return {
      showDialog: computed(() => store.state.productDialog.show),
      dialogProduct: computed(() => store.state.productDialog.product),
    }
  },
})
</script>


<style lang="scss">
// TODO: Extract most of this to a separate SCSS file
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');

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
  font-family: 'Roboto', sans-serif;
  margin: 60px 260px;
}

@include respond-below(slg) {
  #app {
    margin: 60px 160px;
  }
}

@include respond-below(xlg) {
  #app {
    margin: 60px 60px;
  }
}

@include respond-below(xlg) {
  #app {
    margin: 40px 40px;
  }
}


.quote {
  margin: 20px 0px;

  padding: 20px;
  border-left: 2px solid black;

  font-weight: 100;
}
</style>
