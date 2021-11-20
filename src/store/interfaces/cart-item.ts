import type { Product } from '@/common/interfaces/product'

export interface CartItem {
  product: Product,
  amount: number,
  price: number,

  additionalOptions?: string[];
  additionalOptionsMeta?: {
    [uuid: string]: object,
  }
}