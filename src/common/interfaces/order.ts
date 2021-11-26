export interface OrderItem {
  product_id: number;
  amount: number;

  selected_items: object;
  selected_items_meta: object;
}

export interface Order {
  items: OrderItem[];
}