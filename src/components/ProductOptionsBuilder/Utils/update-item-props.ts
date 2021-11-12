import { ProductOptionSection, ProductOptionElement } from '@/common/interfaces/product-options';

// TODO: This is probably the ugliest thing I've every written in my life but fuck it,
// deal with it when I have time and much more sleep/energy

export function getItem(uuid: string, item: ProductOptionElement): ProductOptionElement | null {
  if (item.uuid === uuid) {
    return item;
  }

  for (const child of item.children || []) {
    if (child.uuid === uuid) {
      return child;
    } else {
      const foundItem = getItem(uuid, child);

      if (foundItem) {
        return foundItem;
      }
    }
  }

  return null;
}

function fillItems(items: object, item: ProductOptionElement) {
  // @ts-ignore
  items[item.uuid] = item;
  item.children?.forEach(child => {
    fillItems(items, child);
  });

  return items;
}

export function getAllItems(schema: ProductOptionSection[]) {
  const items: object = {}

  for (const section of schema) {
    for (const item of section.children) {
      fillItems(items, item);
    }
  }

  return items;
}


export function updateItemProps(uuid: string, schema: ProductOptionSection[], props: object) {
  const schemaCopy = [...schema];

  let foundItem: ProductOptionElement | null = null;

  for (const section of schemaCopy) {
    for (const item of section.children) {
      foundItem = getItem(uuid, item);
      if (foundItem) {
        break;
      }
    }

    if (foundItem) {
      break;
    }
  }

  Object.assign(foundItem, props);

  return schemaCopy;
}