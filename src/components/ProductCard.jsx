import { Link } from 'react-router-dom';

export default function ProductCard({ product, onSelect }) {
    return (
      <div 
        className="bg-white rounded-sm shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img 
          src={product.image} 
          alt={product.title}
          className="h-48 object-contain mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4">${product.price}</p>
        <div className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-blue-950 text-center">
          View Details
        </div>
      </div>
    );
  }