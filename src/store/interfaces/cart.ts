import { Product } from "@/common/interfaces/product";

export interface Cart {
  [product_id: number]: {
    product: Product,
    amount: number,
  };
}