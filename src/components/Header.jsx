import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cart, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">FakeStore</Link>
        <nav className="flex items-center gap-4">
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1"
          >
            <UserIcon className="h-6 w-6" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}