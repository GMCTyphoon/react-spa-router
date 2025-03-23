import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
} from '../features/products/productsSlice';
import { Product } from '../features/products/productsTypes';

export const useFetchProducts = () => {
  const dispatch = useDispatch();

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
};
