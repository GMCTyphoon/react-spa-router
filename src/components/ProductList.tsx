import { useState, useRef } from 'react';
import { Product } from '../features/products/productsTypes';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  const dispatch = useDispatch();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleAddToCart = (product: Product) => {
    // Сбрасываем предыдущий таймер, если он есть
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );

    // Показываем анимацию и убираем её через 1 секунду
    setAddedProductId(product.id);
    timerRef.current = setTimeout(() => {
      setAddedProductId(null);
    }, 1000);
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <li key={product.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-64 overflow-hidden rounded-lg group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 mt-4">{product.title}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <button
            disabled={addedProductId === product.id}
            onClick={() => handleAddToCart(product)}
            className={`mt-4 px-4 py-2 text-white rounded-lg transition-all duration-300 cursor-pointer ${
              addedProductId === product.id
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {addedProductId === product.id
              ? 'Добавлено!'
              : 'Добавить в корзину'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
