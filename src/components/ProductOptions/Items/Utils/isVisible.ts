import { ProductOptionElement } from "@/common/interfaces/product-options";
import { computed, ComputedRef, watch } from "vue";

export function getVisibility(props: any): ComputedRef<boolean> {
  const isVisible = computed(() => {
    const has_condition = 
      props.item.condition && props.item.condition !== '';

    if (!has_condition) {
      return true;
    }

    return props.selectedElements.has(props.item.condition as string);
  });

  return isVisible;
}

export function setVisibilityWatcher(emit: any, item: ProductOptionElement, isVisible: ComputedRef<boolean>): void {
  // TODO: Do we really need that?

  watch(isVisible, (value: boolean) => {
    console.log(value, item);

    if (value) {
      return;
    }

    item.children?.forEach(child => {
      emit('unselect', child.uuid);
    });

    emit('unselect', item.uuid);
  })
}
