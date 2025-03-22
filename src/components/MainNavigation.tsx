import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function MainNavigation() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="text-white text-lg font-semibold">
            Магазин
          </NavLink>
          <ul className="flex space-x-4 items-center">
            <li>
              <NavLink
                to="/"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
              >
                <ShoppingCartIcon className="h-6 w-6 mr-2" />
                Корзина
                {totalItems > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
