export interface NumberInputMeta {
  step_size: number;
  strict_step: false;
}

export interface ProductOptionElement {
  uuid: string;
  item: string;

  name?: string;
  price_modifier?: number;

  children?: ProductOptionElement[];

  is_selected?: boolean;
  required?: boolean;
  hint?: string;

  meta?: object;

  condition?: string[];
}

export interface ProductOptionSection {
  uuid: string;
  item: string;
  name: string | null;
  children: ProductOptionElement[],
}