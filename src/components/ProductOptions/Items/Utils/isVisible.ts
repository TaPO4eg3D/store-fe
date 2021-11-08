import { ProductOptionElement } from "@/common/interfaces/product-options";
import { computed, ComputedRef, watch } from "vue";

export function getVisibility(props: any): ComputedRef<boolean> {
  const isVisible = computed(() => {
    const has_condition = 
      props.item.condition && props.item.condition.length > 0;

    if (!has_condition) {
      return true;
    }

    for (const uuid of props.item.condition) {
      if (!props.selectedElements.has(uuid)) {
        return false;
      }
    }

    return true;
  });

  return isVisible;
}

export function setVisibilityWatcher(emit: any, item: ProductOptionElement, isVisible: ComputedRef<boolean>): void {
  // TODO: Do we really need that?

  watch(isVisible, () => {
    if (isVisible.value) {
      return;
    }

    item.children?.forEach(child => {
      emit('unselect', child.uuid);
    });

    console.log('PENDING UNSELECT: ', item.uuid);
    emit('unselect', item.uuid);
  })
}
