import { CartItem as CartItemType } from '../../features/cart/cartTypes';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <li className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            id={item.id}
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="w-16 p-2 border rounded-lg"
          />
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
