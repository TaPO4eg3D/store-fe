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
      // Info under slider
      el-row
        el-col(:span="24")
          .quote Вы можете приобрести оригинальные ключи активации для операционных систем, офисных программ, антивирусов, софта и другого по самым выгодным ценам. У нас быстрая, вежливая и грамотная техподдержка. Если что-то пойдёт не так - поможет решить возникший вопрос.
          // TODO: delete
          product-card(
            :price="200",
            :discountPrice="160",
            :product="testProduct",
          )

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import KeenSlider from 'keen-slider'

import Navigation from '@/components/Home/Navigation.vue'
import ProductCard from '@/components/ProductCard.vue'

import { Product } from '@/common/interfaces/product'

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
    ProductCard,
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

    // TODO: Delete
    const testProduct: Product = {
      image: 'https://os-market.store/image/cache/catalog/office2016/201910-pro-1-180x180.jpg',
      name: 'Test Product 1',
    }

    return {
      slider,
      slidesNumber,
      currentSlide,
      testProduct,
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
