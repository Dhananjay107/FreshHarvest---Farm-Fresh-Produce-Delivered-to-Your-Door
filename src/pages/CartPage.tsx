import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  // Set page title
  useEffect(() => {
    document.title = 'Shopping Cart | Fresh Harvest';
  }, []);
  
  // Calculate shipping cost - free over $50
  const shippingCost = cart.totalPrice >= 50 ? 0 : 5.99;
  
  // Calculate tax (assuming 7%)
  const taxRate = 0.07;
  const taxAmount = cart.totalPrice * taxRate;
  
  // Calculate order total
  const orderTotal = cart.totalPrice + shippingCost + taxAmount;
  
  if (cart.items.length === 0) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="bg-white rounded-xl p-8 shadow-sm text-center max-w-lg mx-auto">
            <div className="text-gray-400 mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M16.5 9H14C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H7.5C7.22 9 7 9.22 7 9.5C7 9.78 7.22 10 7.5 10H16.5C16.78 10 17 9.78 17 9.5C17 9.22 16.78 9 16.5 9Z" fill="currentColor"/>
                <path d="M17 3H7C5.9 3 5 3.9 5 5V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V5C19 3.9 18.1 3 17 3ZM17 21H7V5H17V21Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-8">
          Your Shopping Cart
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="hidden md:flex bg-gray-50 p-4 border-b border-gray-200">
                <div className="w-1/2">Product</div>
                <div className="w-1/6 text-center">Price</div>
                <div className="w-1/6 text-center">Quantity</div>
                <div className="w-1/6 text-center">Total</div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.weightOption}`} className="p-4 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-medium text-gray-800 hover:text-green-500">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          Weight: {item.weightOption}kg
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 text-sm flex items-center mt-2 hover:text-red-600 md:hidden"
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/6 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                      {formatCurrency(
                        item.product.discount 
                          ? item.product.price * (1 - item.product.discount / 100) 
                          : item.product.price
                      )}
                    </div>
                    
                    <div className="w-full md:w-1/6 flex justify-center mb-4 md:mb-0">
                      <div className="flex items-center">
                        <div className="md:hidden text-sm text-gray-500 mr-2">Quantity:</div>
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-l bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        >
                          <Minus size={14} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-10 h-8 text-center text-sm border-t border-b border-gray-300"
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-r bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/6 text-center flex md:block justify-between items-center">
                      <div className="md:hidden text-sm text-gray-500">Total:</div>
                      <div className="font-medium text-green-600">
                        {formatCurrency(
                          parseFloat(item.weightOption) * item.quantity * 
                          (item.product.discount 
                            ? item.product.price * (1 - item.product.discount / 100) 
                            : item.product.price)
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hidden md:inline-flex hover:text-red-600 ml-4"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 mb-4 sm:mb-0"
              >
                Clear Cart
              </button>
              
              <Link to="/products" className="btn btn-outline">
                <ArrowLeft size={18} className="mr-2" /> Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-poppins font-semibold text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>{formatCurrency(cart.totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 
                        ? <span className="text-green-500">Free</span> 
                        : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (7%)</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  
                  {shippingCost > 0 && (
                    <div className="text-sm text-green-600">
                      Add {formatCurrency(50 - cart.totalPrice)} more to qualify for free shipping
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>
              
              <div className="p-6">
                <Link to="/checkout" className="btn btn-primary w-full mb-4">
                  Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                </Link>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>We accept</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="bg-gray-100 rounded p-1">
                      <svg width="32" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                        <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#1A1F71"/>
                        <path d="M9.22 6.01L6.87 10.12H8.76L9.08 9.34H11.09L11.41 10.12H13.3L10.95 6.01H9.22ZM9.56 8.02L10.09 6.81L10.62 8.02H9.56Z" fill="white"/>
                        <path d="M13.64 10.12H15.4L15.99 8.83L16.59 10.12H18.36L16.54 6.01H14.47L13.47 8.4L12.96 6.01H11.09L13.63 10.12H13.64Z" fill="white"/>
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded p-1">
                      <svg width="32" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#3C4454"/>
                        <circle cx="8.5" cy="8" r="4" fill="#EB001B" fillOpacity="0.8"/>
                        <circle cx="15.5" cy="8" r="4" fill="#F79E1B" fillOpacity="0.8"/>
                        <path d="M12 5.5C13.1935 6.69347 13.1935 9.30653 12 10.5C10.8065 9.30653 10.8065 6.69347 12 5.5Z" fill="#FF5F00"/>
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded p-1">
                      <svg width="32" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#006FCF"/>
                        <path d="M14.5 8C14.5 9.933 12.933 11.5 11 11.5C9.067 11.5 7.5 9.933 7.5 8C7.5 6.067 9.067 4.5 11 4.5C12.933 4.5 14.5 6.067 14.5 8Z" fill="white"/>
                        <path d="M16.5 4.5H15.5V11.5H16.5V4.5Z" fill="white"/>
                      </svg>
                    </div>
                    <div className="bg-gray-100 rounded p-1">
                      <svg width="32" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#F1F1F1"/>
                        <path d="M9 7.5H8V11.5H9V7.5Z" fill="#253B80"/>
                        <path d="M8.5 5C8.22386 5 8 5.22386 8 5.5C8 5.77614 8.22386 6 8.5 6C8.77614 6 9 5.77614 9 5.5C9 5.22386 8.77614 5 8.5 5Z" fill="#253B80"/>
                        <path d="M11.5 7.45C11.2239 7.45 11 7.67386 11 7.95V9.05C11 9.32614 11.2239 9.55 11.5 9.55C11.7761 9.55 12 9.32614 12 9.05V7.95C12 7.67386 11.7761 7.45 11.5 7.45Z" fill="#253B80"/>
                        <path d="M14.5 7.45C14.2239 7.45 14 7.67386 14 7.95V9.05C14 9.32614 14.2239 9.55 14.5 9.55C14.7761 9.55 15 9.32614 15 9.05V7.95C15 7.67386 14.7761 7.45 14.5 7.45Z" fill="#253B80"/>
                        <path d="M13 7.5H12V11.5H13V7.5Z" fill="#253B80"/>
                        <path d="M16 7.5H15V11.5H16V7.5Z" fill="#253B80"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
              <div className="p-6">
                <h3 className="font-medium mb-4">Apply Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="input-field rounded-r-none flex-1"
                  />
                  <button className="btn bg-gray-800 hover:bg-gray-900 text-white rounded-l-none">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;