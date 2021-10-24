import type { Product } from '@/common/interfaces/product';

export interface ProductDialog {
  show: boolean;
  product: Product | null;
}
