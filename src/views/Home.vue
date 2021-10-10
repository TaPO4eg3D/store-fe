<template lang="pug">
div
  h1 Store
  el-row(:gutter="20")
    // Navigation section
    el-col.hidden-md-and-down(:span="5")
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
            .daily-slider
              .splide__track
                .splide__list
                  li.splide__slide
                    img(src="../assets/test_image.jpg")
                  li.splide__slide
                    img(src="../assets/test_image.jpg")
                  li.splide__slide
                    img(src="../assets/test_image.jpg")
            .dots
              .dot(
                v-for="i in slidesNumber",
                :class="{ active: i - 1 === activeSlide }"
                @click="slider.go(i - 1)"
              )
      // Info under slider
      el-row
        el-col(:span="24")
          .quote Вы можете приобрести оригинальные ключи активации для операционных систем, офисных программ, антивирусов, софта и другого по самым выгодным ценам. У нас быстрая, вежливая и грамотная техподдержка. Если что-то пойдёт не так - поможет решить возникший вопрос.
  el-row(:gutter="20", style="margin-top: 15px")
    el-col(:span="5")
      general-card.selling-hits(
        header="Хиты продаж",
        :isSlider="true",
      )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )
    el-col(:span="19")
      general-card.recommended(
        header="Мы рекоммендуем",
        :isSlider="true",
        :itemsPerSlide="itemsPerSlide",
        :slideBreakpoints="slideBreakpoints",
      )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )
        .splide__slide
          product-card(
            :product="testProduct"
          )

</template>

<script lang="ts">
import { inject, defineComponent, ref, Ref, onMounted, watch } from 'vue'

import Splide from '@splidejs/splide';

import Navigation from '@/components/Home/Navigation.vue'
import ProductCard from '@/components/ProductCard.vue'
import GeneralCard from '@/components/GeneralCard.vue'

import { Product } from '@/common/interfaces/product'
import { getWindowWidth } from '@/common/utils/get-window-width'

/**
 * Setting up a Splide slider.
 */
function setupSlider(): [Ref<Splide | undefined>, Ref<number>] {
  const slider = ref();
  const activeSlide = ref(0);
  
  onMounted(() => {
    slider.value = new Splide('.daily-slider', {
      type: 'loop',
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 8000,
    });

    slider.value.mount();
    slider.value.on('move', () => {
      activeSlide.value = slider.value.index;
    })
  });

  return [slider, activeSlide];
}

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
    ProductCard,
    GeneralCard,
  },
  setup() {
    const breakpoints: {[point: string]: number} | undefined = inject('breakpoints');

    const itemsPerSlide = ref(5);

    const slideBreakpoints = ref();
    if (breakpoints)  {
      slideBreakpoints.value = {
        [breakpoints['lg']]: 4,
        [breakpoints['md']]: 3,
        [breakpoints['sm']]: 2,
        [breakpoints['xs']]: 1,
      };
    }

    const [slider, activeSlide] = setupSlider();
    const slidesNumber = ref(3);

    // TODO: Delete
    const testProduct: Product = {
      image: 'https://os-market.store/image/cache/catalog/office2016/201910-pro-1-180x180.jpg',
      name: 'Test Product 1',
    }

    return {
      slider,
      slidesNumber,
      testProduct,
      activeSlide,
      itemsPerSlide,
      slideBreakpoints,
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

.slider-wrapper  {
  img {
    width: 100%;
    height: 100%;
  }
}

.slider-wrapper {
  margin-top: 15px;

  position: relative;
  border: 1px solid #DCDFE6;
  border-radius: 4px;

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
