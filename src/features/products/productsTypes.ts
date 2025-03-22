export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}
