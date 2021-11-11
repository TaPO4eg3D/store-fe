import { Category } from "./category";
import { ProductOptionSection } from "./product-options";

export interface Product {
  id: number;
  name: string,
  preview_image: string,

  price: number;
  discount_price: number;
  description: string;

  category: Category;
  additional_options?: ProductOptionSection[] | null;
}