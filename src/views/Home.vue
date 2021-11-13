<template lang="pug">
.home
  .home__slider.divider
    div
    .home__offers
      // Slider of offers
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
      .home__info
        .quote {{ $t('home.info_description') }}

  about(
    :title="aboutInfo.title"
    :items="aboutInfo.items"
    )
  .home__popular
    popular-products
  div
    general-card.recommended(
      header="Recommended products",
      :isSlider="true",
      :itemsPerSlide="itemsPerSlide",
      :slideBreakpoints="slideBreakpoints",
      v-if="recommendedProducts.length != 0"
    )
      .splide__slide(v-for="product in recommendedProducts")
        product-card(
          :product="product"
        )
</template>

<script lang="ts">
import axios from 'axios'

import { inject, defineComponent, ref, Ref, onMounted, watch } from 'vue'

import Splide from '@splidejs/splide'

import About from '@/components/Home/About.vue'
import Navigation from '@/components/Home/Navigation.vue'
import ProductCard from '@/components/ProductCard.vue'
import GeneralCard from '@/components/GeneralCard.vue'
import Search from '@/components/Home/Search.vue'
import PopularProducts from '@/components/Home/PopularProducts.vue'

import { Product } from '@/common/interfaces/product'
import { getWindowWidth } from '@/common/utils/get-window-width'
import { ListResponse } from '@/common/interfaces/list-response'

/**
 * Setting up a Splide slider.
 */
function setupSlider (): [Ref<Splide | undefined>, Ref<number>] {
  const slider = ref()
  const activeSlide = ref(0)

  onMounted(() => {
    slider.value = new Splide('.daily-slider', {
      type: 'loop',
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 8000
    })

    slider.value.mount()
    slider.value.on('move', () => {
      activeSlide.value = slider.value.index
    })
  })

  return [slider, activeSlide]
}

export default defineComponent({
  name: 'Home',
  components: {
    About,
    Navigation,
    ProductCard,
    GeneralCard,
    Search,
    PopularProducts
  },
  setup () {
    const breakpoints: {[point: string]: number} | undefined = inject('breakpoints')

    const itemsPerSlide = ref(5)

    const slideBreakpoints = ref()
    if (breakpoints) {
      slideBreakpoints.value = {
        [breakpoints.lg]: 4,
        [breakpoints.md]: 3,
        [breakpoints.sm]: 2,
        [breakpoints.xs]: 1
      }
    }

    const [slider, activeSlide] = setupSlider()
    const slidesNumber = ref(3)

    const recommendedProducts: Ref<Product[]> = ref([])

    const aboutInfo = {
      title: 'About services',
      items: [
        {
          id: 0,
          img: 'security.png',
          title: 'Security guarantee',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua.'
        },
        {
          id: 1,
          img: 'delivery.png',
          title: 'Instant delivery',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
            'ut aliquip ex ea commodo consequat.'
        },
        {
          id: 2,
          img: 'support.png',
          title: 'Customer support',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
            'labore et dolore magna aliqua.'
        }
      ]
    }

    onMounted(async () => {
      // TODO: Add exception handling and refactor in general
      const response = await axios.get<ListResponse<any>>('/api/recommended-product-slides/')
      recommendedProducts.value = response.data.results.map(item => {
        return item.product
      })
    })

    return {
      slider,
      slidesNumber,
      activeSlide,
      itemsPerSlide,
      slideBreakpoints,
      recommendedProducts,
      aboutInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-gap: 20px;
  &__offers {
    display: grid;
    grid-gap: 20px;
  }
}
.slider-wrapper {
  position: relative;
  border: 1px solid #DCDFE6;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
  }

  .dots {
    display: flex;
    grid-gap: 5px;

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
  }

  .dot.active {
    background-color: #000;
  }
}
</style>
