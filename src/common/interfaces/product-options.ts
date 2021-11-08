export interface ProductOptionElement {
  uuid: string;
  item: string;

  name?: string;
  price_modifier?: number;
  is_selected?: boolean;
  children?: ProductOptionElement[];
  hint?: string;
  style?: object;
}

export interface ProductOptionSection {
  name: string | null;
  children: ProductOptionElement[],
}