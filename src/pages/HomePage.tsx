import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
} from '../features/products/productsSlice';
import { RootState } from '../app/store';
import ProductList from '../components/ProductList';
import SearchAndFilter from '../components/SearchAndFilter';
import { Product } from '../features/products/productsTypes';

function HomePage() {
  const dispatch = useDispatch();
  const {
    items: allProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Загрузка данных
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }

        const data = await response.json();

        const formattedProducts: Product[] = data.map((product: Product) => ({
          id: product.id.toString(),
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
        }));

        dispatch(setProducts(formattedProducts));
        setFilteredProducts(formattedProducts); 
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err);
        dispatch(
          setError('Ошибка при загрузке товаров. Пожалуйста, попробуйте снова.')
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

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
        <ProductList products={filteredProducts} />
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
