import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:flex md:gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-96 h-96 object-contain mb-4"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-xl font-bold mb-4">${product.price}</div>
            <button
              onClick={addToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}