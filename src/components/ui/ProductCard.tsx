import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default weight option
    addToCart(product, 1, product.weightOptions[0]);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="product-card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          {/* Discount badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {product.discount}% OFF
            </div>
          )}
          
          {/* Seasonal badge */}
          {product.seasonal && !product.discount && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              Seasonal
            </div>
          )}
          
          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
          </button>
          
          {/* Product image */}
          <div className="h-48 md:h-60 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
          
          {/* Quick add overlay */}
          <div 
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center"
            >
              <ShoppingCart size={18} className="mr-2" /> Quick Add
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="font-medium text-gray-800 hover:text-green-500 transition">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 h-10 overflow-hidden">
              {product.description}
            </p>
          </div>
          
          <div className="mt-auto">
            <div className="text-sm text-gray-500 mb-1">
              {product.weightOptions[0]}kg / piece
            </div>
            <div className="flex items-baseline">
              {product.discount ? (
                <>
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-green-600">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;