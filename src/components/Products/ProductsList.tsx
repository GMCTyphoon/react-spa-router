import { Product } from '../../features/products/productsTypes';
import ProductItem from './ProductItem';

interface ProductsListProps {
  products: Product[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductsList;
