import { ref, onBeforeUnmount, Ref } from 'vue'

export function getWindowWidth(): Ref<number> {
  const windowWidth = ref(0);

  const onResize = () => {
    windowWidth.value = window.innerWidth;
  }
  window.addEventListener('resize', onResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
  })

  return windowWidth
}
