<template lang="pug">
.general-card
  .header-wrapper
    .header {{ header }}
    .slider-control(v-if="isSlider")
      arrow-left-bold(
        @click="slider.go('-1')"
      )
      arrow-right-bold(
        @click="slider.go('+1')"
      )
  .content-wrapper
    .content(v-if="!isSlider")
      slot
    .content-slider(v-if="isSlider")
      .splide(ref="sliderRef")
        .splide__track
          .splide__list
            slot
</template>

<script lang="ts">
import Splide from '@splidejs/splide'
import { defineComponent, onMounted, ref, Ref, watch } from 'vue'

export default defineComponent({
  props: {
    header: {
      type: String,
      required: true
    },
    isSlider: {
      type: Boolean,
      default: false
    },
    itemsPerSlide: {
      type: Number,
      default: 1
    },
    slideBreakpoints: {
      type: Object,
      default: {}
    }
  },
  setup (props) {
    const slider = ref()
    const sliderRef: Ref<HTMLElement> | Ref<undefined> = ref()

    const refreshSlider = () => {
      if (!slider.value) {
        return
      }

      slider.value.refresh()
    }

    onMounted(() => {
      if (!sliderRef.value) {
        return
      }

      const breakpoints: any = {}
      Object.entries(props.slideBreakpoints).forEach(([point, value]) => {
        breakpoints[point] = {
          perPage: value
        }
      })

      slider.value = new Splide(sliderRef.value, {
        type: 'loop',
        arrows: false,
        pagination: false,
        autoplay: true,
        perPage: props.itemsPerSlide,
        gap: '10px',
        breakpoints
      })
      slider.value.mount()
    })

    return {
      slider,
      sliderRef,
      refreshSlider
    }
  }
})
</script>

<style lang="scss" scoped>
.general-card {
  border: 1px solid #DCDFE6;
  border-radius: 8px 8px 0px 0px;

  .header-wrapper {
    user-select: none;

    display: flex;
    background-color: #F5F5F5;
  }

  .header {
    font-weight: 100;

    padding: 8px;
    font-size: 16px;
  }

  .slider-control {
    display: flex;
    margin-left: auto;
    margin-right: 7px;

    svg {
      // left and right arrows
      cursor: pointer;
      color: #949494;

      width: 15px;

      transition: color .3s ease;
    }

    svg:hover {
      color: black;
    }
  }

  .content-wrapper {
    padding: 15px;
  }
}
</style>
