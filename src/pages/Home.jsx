import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, setCart } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = selectedCategory 
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';
      const response = await axios.get(url);
      setProducts(response.data);
    };

    const fetchCategories = async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    };

    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSelectedProduct(null); // Close modal after adding to cart
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found matching your search.
            </div>
          )}
        </div>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-64 object-contain mb-4"
                />
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <div className="text-xl font-bold mb-4">${selectedProduct.price}</div>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}