import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  
  const product = getProductById(Number(id));
  
  // Get related products from the same category
  const relatedProducts = products
    .filter(p => p.id !== Number(id) && (p.category === product?.category || p.tags.some(tag => product?.tags.includes(tag))))
    .slice(0, 4);
  
  // Set default weight option
  useEffect(() => {
    if (product && product.weightOptions.length > 0) {
      setSelectedWeight(product.weightOptions[0]);
    }
  }, [product]);
  
  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Fresh Harvest`;
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="container-custom py-32 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
  };
  
  // Calculate actual price with discount
  const actualPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const totalPrice = actualPrice * parseFloat(selectedWeight) * quantity;
  
  return (
    <div className="pt-28 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-green-500">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/products" className="hover:text-green-500">Products</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/products/${product.category}`} className="hover:text-green-500 capitalize">
              {product.category}
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            {/* Product badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.organic && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Organic
                </span>
              )}
              {product.seasonal && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Seasonal
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">(24 reviews)</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                {product.discount ? (
                  <>
                    <span className="text-3xl font-semibold text-green-600 mr-3">
                      {formatCurrency(actualPrice)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="ml-3 bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-medium">
                      Save {formatCurrency(product.price - actualPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold text-green-600">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Price per {selectedWeight}kg / piece
              </p>
            </div>
            
            {/* Weight Options */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select Weight/Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-4 py-2 rounded-lg border font-medium transition ${
                      selectedWeight === weight
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {weight}kg
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Picker */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 h-10 text-center border-t border-b border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
                
                <div className="ml-4 text-gray-600">
                  Total: <span className="font-semibold text-green-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
              >
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </button>
              
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`btn flex-1 ${
                  isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart size={18} className={`mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
              </button>
            </div>
            
            {/* Stock & Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start mb-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                    <path d="M8.5 14.5L4 10L2.9 11.1L8.5 16.7L21.5 3.7L20.4 2.6L8.5 14.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-800">In Stock</span>
                  <p className="text-sm text-gray-600">Usually ships within 1-2 business days</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                    <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM19.5 9.5L21.46 12H17V9.5H19.5ZM6 18C5.45 18 5 17.55 5 17C5 16.45 5.45 16 6 16C6.55 16 7 16.45 7 17C7 17.55 6.55 18 6 18ZM8.22 15C7.67 14.39 6.89 14 6 14C5.11 14 4.33 14.39 3.78 15H3V6H15V15H8.22ZM18 18C17.45 18 17 17.55 17 17C17 16.45 17.45 16 18 16C18.55 16 19 16.45 19 17C19 17.55 18.55 18 18 18Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-800">Free Shipping</span>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
            </div>
            
            {/* Origin & Storage */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.origin && (
                <div className="p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-500">Origin:</span>
                  <p className="font-medium text-gray-800">{product.origin}</p>
                </div>
              )}
              
              {product.storageInfo && (
                <div className="p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-500">Storage:</span>
                  <p className="font-medium text-gray-800">{product.storageInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'nutrition'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutrition Facts
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (24)
              </button>
            </div>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  {product.longDescription || product.description}
                </p>
              </div>
            )}
            
            {activeTab === 'nutrition' && (
              <div>
                {product.nutritionFacts ? (
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-green-50 p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-lg text-gray-800">Nutrition Facts</h3>
                      <p className="text-gray-600 text-sm">Serving size: 100g</p>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">Calories</span>
                        <span>{product.nutritionFacts.calories}</span>
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">Protein</span>
                        <span>{product.nutritionFacts.protein}g</span>
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">Carbohydrates</span>
                        <span>{product.nutritionFacts.carbs}g</span>
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">Fat</span>
                        <span>{product.nutritionFacts.fat}g</span>
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">Fiber</span>
                        <span>{product.nutritionFacts.fiber}g</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Nutrition information is not available for this product.</p>
                )}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <p className="text-gray-600 mb-4">
                  This product has 24 reviews with an average rating of 4.8 stars.
                </p>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Excellent quality!</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      The freshness and quality of these fruits is amazing. Will definitely order again!
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Sarah J.</span>
                      <span className="mx-2">•</span>
                      <span>Verified Purchase</span>
                      <span className="mx-2">•</span>
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Great taste</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      These are very delicious and arrived in perfect condition. I'll be ordering more soon.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Michael T.</span>
                      <span className="mx-2">•</span>
                      <span>Verified Purchase</span>
                      <span className="mx-2">•</span>
                      <span>1 month ago</span>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 btn btn-outline">
                  Read All 24 Reviews
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-6">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;