export interface Category {
  id: number;
  name: string;
  child: Category | null;
}