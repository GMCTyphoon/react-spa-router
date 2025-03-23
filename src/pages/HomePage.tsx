import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ProductsList from '../components/Products/ProductsList';
import SearchAndFilter from '../components/SearchAndFilter';
import { Product } from '../features/products/productsTypes';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useEffect, useState } from 'react';

function HomePage() {
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  // Используем кастомный хук для загрузки данных
  useFetchProducts();

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  if (loading) {
    return <div className="text-center py-4">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Главная страница</h1>

      {/* Поиск и фильтрация */}
      <SearchAndFilter
        products={allProducts}
        onFilteredProductsChange={setFilteredProducts}
      />

      {/* Список товаров или сообщение, если товары не найдены */}
      {filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <div className="text-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Товары не найдены.
        </div>
      )}
    </div>
  );
}

export default HomePage;
