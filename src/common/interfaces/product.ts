import { Category } from './category'

export interface Product {
  id: number;
  name: string,
  preview_image: string,

  price: number;
  discount_price: number;
  description: string;

  category: Category;
}
