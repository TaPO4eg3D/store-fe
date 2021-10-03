<template lang="pug">
div
  h1 {{ $t('message') }}
  el-row(:gutter="20")
    // Navigation section
    el-col(:span="5")
      navigation
    // Search Section
    el-col(:span="19")
      el-row(:gutter="20")
        el-col(:span="20")
          el-input(
            prefix-icon="el-icon-search",
            :placeholder="$t('product_search_placeholder')",
          )
        // Cart section
        el-col(:span="4")
          el-badge.cart-button.item(:value="12")
            el-button(
              plain,
              type="primary",
              size="large",
            )
              el-icon
                shopping-cart
              | {{ $t('cart') }}
      // Slider of offers
      el-row
        el-col(:span="24")
          .slider-wrapper
            #slider.keen-slider
              .keen-slider__slide
                img(src="../assets/test_image.jpg")
              .keen-slider__slide
                img(src="../assets/test_image.jpg")
              .keen-slider__slide
                img(src="../assets/test_image.jpg")
            .dots
              .dot(
                v-for="n in slidesNumber",
                :class="{ active: n - 1 === currentSlide }"
                @click="slider.moveToSlideRelative(n - 1)"
              )

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import KeenSlider from 'keen-slider'

import Navigation from '@/components/Home/Navigation.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
  },
  setup() {
    const slider = ref();
    const slidesNumber = ref(3);

    const currentSlide = ref(0);

    onMounted(() => {
      console.log('mounted!');
      slider.value = new KeenSlider(
        '#slider', {
          initial: currentSlide.value,
          slideChanged: (slider) => {
            currentSlide.value = slider.details().relativeSlide;
          }
        }
      );

      console.log(slider.value);
    });

    return {
      slider,
      slidesNumber,
      currentSlide,
    }
  }
})
</script>

<style lang="scss">
.cart-button {
  width: 100%;

  .el-icon {
    margin-right: 4px;
  }

  button {
    width: 100%;
  }
}

.keen-slider  {
  img {
    width: 100%;
    height: 100%;
  }
}

.slider-wrapper {
  margin-top: 15px;

  position: relative;

  .dots {
    display: flex;

    position: absolute;
    bottom: 24px;
    right: 15px;
  }

  .dot {
    cursor: pointer;

    width: 12px;
    height: 12px;

    border-radius: 50%;
    background-color: #C5C5C5;

    margin-left: 5px;
  }

  .dot.active {
    background-color: #000;
  }
}
</style>
