export interface ProductOptionElement {
  uuid: string;
  item: string;

  name?: string;
  price_modifier?: number;

  children?: ProductOptionElement[];

  is_selected?: boolean;
  hint?: string;
  style?: object;

  condition?: string[];
}

export interface ProductOptionSection {
  name: string | null;
  children: ProductOptionElement[],
}