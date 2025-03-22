import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';

interface CartSummaryProps {
  totalAmount: number;
}

function CartSummary({ totalAmount }: CartSummaryProps) {
  const dispatch = useDispatch();

  return (
    <div className="mt-6 text-right">
      <p className="text-xl font-semibold">
        Общая стоимость: ${totalAmount.toFixed(2)}
      </p>
      <button
        onClick={() => dispatch(clearCart())}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
      >
        Очистить корзину
      </button>
    </div>
  );
}

export default CartSummary;
