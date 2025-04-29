import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = 'Checkout | Fresh Harvest';
  }, []);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    sameAsBilling: true,
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Calculate shipping cost - free over $50
  const shippingCost = cart.totalPrice >= 50 ? 0 : 5.99;
  
  // Calculate tax (assuming 7%)
  const taxRate = 0.07;
  const taxAmount = cart.totalPrice * taxRate;
  
  // Calculate order total
  const orderTotal = cart.totalPrice + shippingCost + taxAmount;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeStep === 1) {
      setActiveStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeStep === 2) {
      // Simulate placing order
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  if (orderPlaced) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            
            <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-4">
              Thank You for Your Order!
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Your order has been placed successfully. You will receive a confirmation email shortly with your order details.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Number:</span>
                <span>#FH{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Order Total:</span>
                <span className="font-semibold text-green-600">{formatCurrency(orderTotal)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
              
              <Link to="/products" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-800">
            Checkout
          </h1>
          
          <Link to="/cart" className="text-green-500 hover:text-green-600 flex items-center">
            <ArrowLeft size={18} className="mr-1" /> Back to Cart
          </Link>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="w-full absolute top-1/2 -translate-y-1/2 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: activeStep === 1 ? '0%' : '100%' }}
              ></div>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                activeStep >= 1 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-500'
              } z-10`}>
                <ShoppingBag size={18} />
              </div>
              <span className={`mt-2 text-sm font-medium ${
                activeStep >= 1 ? 'text-green-500' : 'text-gray-500'
              }`}>
                Shipping
              </span>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                activeStep >= 2 ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-500'
              } z-10`}>
                <CreditCard size={18} />
              </div>
              <span className={`mt-2 text-sm font-medium ${
                activeStep >= 2 ? 'text-green-500' : 'text-gray-500'
              }`}>
                Payment
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {activeStep === 1 && (
                <form onSubmit={handleSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="font-poppins font-semibold text-xl mb-6">
                      Contact Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="font-poppins font-semibold text-xl mb-6">
                      Billing Address
                    </h2>
                    
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-2">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-gray-700 text-sm font-medium mb-2">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="sameAsBilling"
                          name="sameAsBilling"
                          checked={formData.sameAsBilling}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-500 rounded focus:ring-green-400"
                        />
                        <label htmlFor="sameAsBilling" className="ml-2 text-gray-700">
                          Shipping address same as billing
                        </label>
                      </div>
                    </div>
                    
                    {!formData.sameAsBilling && (
                      <div className="mt-6">
                        <h3 className="font-medium text-gray-800 mb-4">Shipping Address</h3>
                        
                        <div className="mb-4">
                          <label htmlFor="shippingAddress" className="block text-gray-700 text-sm font-medium mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            id="shippingAddress"
                            name="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                            required={!formData.sameAsBilling}
                            className="input-field"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="shippingCity" className="block text-gray-700 text-sm font-medium mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              id="shippingCity"
                              name="shippingCity"
                              value={formData.shippingCity}
                              onChange={handleChange}
                              required={!formData.sameAsBilling}
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="shippingState" className="block text-gray-700 text-sm font-medium mb-2">
                              State/Province *
                            </label>
                            <input
                              type="text"
                              id="shippingState"
                              name="shippingState"
                              value={formData.shippingState}
                              onChange={handleChange}
                              required={!formData.sameAsBilling}
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="shippingZipCode" className="block text-gray-700 text-sm font-medium mb-2">
                              ZIP/Postal Code *
                            </label>
                            <input
                              type="text"
                              id="shippingZipCode"
                              name="shippingZipCode"
                              value={formData.shippingZipCode}
                              onChange={handleChange}
                              required={!formData.sameAsBilling}
                              className="input-field"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <button type="submit" className="btn btn-primary w-full">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {activeStep === 2 && (
                <form onSubmit={handleSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="font-poppins font-semibold text-xl mb-6">
                      Payment Information
                    </h2>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="bg-gray-100 rounded p-2">
                          <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                            <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#1A1F71"/>
                            <path d="M9.22 6.01L6.87 10.12H8.76L9.08 9.34H11.09L11.41 10.12H13.3L10.95 6.01H9.22ZM9.56 8.02L10.09 6.81L10.62 8.02H9.56Z" fill="white"/>
                            <path d="M13.64 10.12H15.4L15.99 8.83L16.59 10.12H18.36L16.54 6.01H14.47L13.47 8.4L12.96 6.01H11.09L13.63 10.12H13.64Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                          <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#3C4454"/>
                            <circle cx="8.5" cy="8" r="4" fill="#EB001B" fillOpacity="0.8"/>
                            <circle cx="15.5" cy="8" r="4" fill="#F79E1B" fillOpacity="0.8"/>
                            <path d="M12 5.5C13.1935 6.69347 13.1935 9.30653 12 10.5C10.8065 9.30653 10.8065 6.69347 12 5.5Z" fill="#FF5F00"/>
                          </svg>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                          <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#006FCF"/>
                            <path d="M14.5 8C14.5 9.933 12.933 11.5 11 11.5C9.067 11.5 7.5 9.933 7.5 8C7.5 6.067 9.067 4.5 11 4.5C12.933 4.5 14.5 6.067 14.5 8Z" fill="white"/>
                            <path d="M16.5 4.5H15.5V11.5H16.5V4.5Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="bg-gray-100 rounded p-2">
                          <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-2">
                          Expiry Date (MM/YY) *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <button type="submit" className="btn btn-primary w-full">
                      Place Order
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="mt-4 text-gray-600 hover:text-gray-800 flex items-center justify-center w-full"
                    >
                      <ArrowLeft size={16} className="mr-1" /> Back to Shipping
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-32">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-poppins font-semibold text-xl mb-6">Order Summary</h2>
                
                <div className="max-h-64 overflow-y-auto mb-4">
                  {cart.items.map((item) => (
                    <div key={`${item.product.id}-${item.weightOption}`} className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-gray-800 font-medium">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.weightOption}kg × {item.quantity}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-gray-800 font-medium">
                          {formatCurrency(
                            parseFloat(item.weightOption) * item.quantity * 
                            (item.product.discount 
                              ? item.product.price * (1 - item.product.discount / 100) 
                              : item.product.price)
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;