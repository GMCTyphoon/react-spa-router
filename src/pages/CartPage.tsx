import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

function CartPage() {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Ваша корзина пуста.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <CartSummary totalAmount={totalAmount} />
        </>
      )}
    </div>
  );
}

export default CartPage;
