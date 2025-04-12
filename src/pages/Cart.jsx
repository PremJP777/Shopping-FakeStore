import { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, setCart } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? {...item, quantity} : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCart([]);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-20 object-contain mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
            {showSuccess && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
                Order placed successfully!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}