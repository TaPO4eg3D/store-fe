import { Product } from "./product";

export interface OrderItem {
  product_id: number;
  amount: number;

  selected_items: object;
  selected_items_meta: object;
}

export interface Order {
  items: OrderItem[];
}

export interface OrderListProductItem {
  product: Product;
  amount: number;

  selected_items?: object;
  selected_items_meta?: object;
}

export interface OrderListItem {
  id: number;
  order_products: OrderListProductItem;
}