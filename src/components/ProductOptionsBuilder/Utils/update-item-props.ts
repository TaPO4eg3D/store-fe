import { ProductOptionSection, ProductOptionElement } from '@/common/interfaces/product-options';

const cloneDeep = require('lodash.clonedeep');

// TODO: This is probably the ugliest thing I've every written in my life but fuck it,
// deal with it when I have time and much more sleep/energy
interface GetItemSignature {
  parent: ProductOptionElement | ProductOptionSection,
  item: ProductOptionElement,
  itemIndex: number,
}

export function _getItem(uuid: string, data: GetItemSignature): GetItemSignature | null {
  const { parent, item, itemIndex } = data;

  if (item.uuid === uuid) {
    return {
      parent,
      item,
      itemIndex,
    };
  }

  const children = item.children || [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childData = {
        parent: item,
        item: child,
        itemIndex: i,
    }

    if (child.uuid === uuid) {
      return childData;
    } else {
      const foundItemData = _getItem(uuid, childData);

      if (foundItemData) {
        return foundItemData;
      }
    }
  }

  return null;
}

function getItem(uuid: string, schema: ProductOptionSection[]): [ProductOptionSection[], GetItemSignature | null] {
  const schemaCopy = cloneDeep(schema);

  let foundItemData: GetItemSignature | null = null;

  for (let i = 0; i < schemaCopy.length; i++) {
    const section = schemaCopy[i];

    for (let j = 0; j < section.children.length; j++) {
      const item = section.children[j];

      foundItemData = _getItem(uuid, {
        parent: section,
        item: item,
        itemIndex: j,
      });
      if (foundItemData) {
        break;
      }
    }

    if (foundItemData) {
      break;
    }
  }

  return [schemaCopy, foundItemData];
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
  let [schemaCopy, foundItemData] = getItem(uuid, schema);

  if (foundItemData) {
    Object.assign(foundItemData['item'], props);
  }

  return schemaCopy;
}

export function deleteItem(uuid: string, schema: ProductOptionSection[]) {
  let [schemaCopy, foundItemData] = getItem(uuid, schema);

  if (foundItemData) {
    foundItemData['parent'].children?.splice(foundItemData['itemIndex'], 1);
  }

  return schemaCopy;
}