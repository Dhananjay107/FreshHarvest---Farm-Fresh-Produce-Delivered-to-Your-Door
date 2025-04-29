import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, CreditCard, Home, Settings } from 'lucide-react';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = 'My Account | Fresh Harvest';
  }, []);
  
  // Mock login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  
  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-poppins font-bold text-gray-800 mb-6">
                Sign In to Your Account
              </h1>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm text-green-500 hover:text-green-600">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full mb-4"
                >
                  Sign In
                </button>
                
                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-green-500 hover:text-green-600 font-medium">
                    Create Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-8">
          My Account
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <User size={32} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-gray-600">john.doe@example.com</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'profile'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={20} className="mr-3" />
                      <span>Profile</span>
                    </button>
                  </li>
                  
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'orders'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('orders')}
                    >
                      <Package size={20} className="mr-3" />
                      <span>Orders</span>
                    </button>
                  </li>
                  
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'addresses'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('addresses')}
                    >
                      <Home size={20} className="mr-3" />
                      <span>Addresses</span>
                    </button>
                  </li>
                  
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'payment'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <CreditCard size={20} className="mr-3" />
                      <span>Payment Methods</span>
                    </button>
                  </li>
                  
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'wishlist'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('wishlist')}
                    >
                      <Heart size={20} className="mr-3" />
                      <span>Wishlist</span>
                    </button>
                  </li>
                  
                  <li>
                    <button
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition ${
                        activeTab === 'settings'
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings size={20} className="mr-3" />
                      <span>Settings</span>
                    </button>
                  </li>
                  
                  <li className="border-t border-gray-200 pt-2 mt-2">
                    <button
                      className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut size={20} className="mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
                  
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-lg mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="(555) 123-4567"
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <button className="btn btn-primary mt-6">
                      Save Changes
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Password</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="input-field"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary mt-6">
                      Update Password
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                  
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #FH123456
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            May 15, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $35.80
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a href="#" className="text-green-500 hover:text-green-600 mr-4">View</a>
                            <a href="#" className="text-blue-500 hover:text-blue-600">Reorder</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #FH123789
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            April 28, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $42.15
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a href="#" className="text-green-500 hover:text-green-600 mr-4">View</a>
                            <a href="#" className="text-blue-500 hover:text-blue-600">Reorder</a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #FH124567
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            April 10, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Delivered
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $28.75
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a href="#" className="text-green-500 hover:text-green-600 mr-4">View</a>
                            <a href="#" className="text-blue-500 hover:text-blue-600">Reorder</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Addresses</h2>
                    <button className="btn btn-outline">Add New Address</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 relative">
                      <div className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                        Default
                      </div>
                      
                      <h3 className="font-medium text-lg mb-2">Home</h3>
                      <p className="text-gray-700 mb-4">
                        John Doe<br />
                        123 Main Street<br />
                        Apt 4B<br />
                        New York, NY 10001<br />
                        United States<br />
                        (555) 123-4567
                      </p>
                      
                      <div className="flex space-x-4">
                        <a href="#" className="text-green-500 hover:text-green-600">Edit</a>
                        <a href="#" className="text-red-500 hover:text-red-600">Delete</a>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-lg mb-2">Work</h3>
                      <p className="text-gray-700 mb-4">
                        John Doe<br />
                        456 Business Ave<br />
                        Suite 200<br />
                        New York, NY 10002<br />
                        United States<br />
                        (555) 987-6543
                      </p>
                      
                      <div className="flex space-x-4">
                        <a href="#" className="text-green-500 hover:text-green-600">Edit</a>
                        <a href="#" className="text-green-500 hover:text-green-600">Set as Default</a>
                        <a href="#" className="text-red-500 hover:text-red-600">Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Payment Methods</h2>
                    <button className="btn btn-outline">Add Payment Method</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 relative">
                      <div className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                        Default
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                          <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#1A1F71"/>
                          <path d="M9.22 6.01L6.87 10.12H8.76L9.08 9.34H11.09L11.41 10.12H13.3L10.95 6.01H9.22ZM9.56 8.02L10.09 6.81L10.62 8.02H9.56Z" fill="white"/>
                          <path d="M13.64 10.12H15.4L15.99 8.83L16.59 10.12H18.36L16.54 6.01H14.47L13.47 8.4L12.96 6.01H11.09L13.63 10.12H13.64Z" fill="white"/>
                        </svg>
                        <span className="font-medium">Visa ending in 4242</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        John Doe<br />
                        Expiry: 05/25
                      </p>
                      
                      <div className="flex space-x-4">
                        <a href="#" className="text-green-500 hover:text-green-600">Edit</a>
                        <a href="#" className="text-red-500 hover:text-red-600">Remove</a>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <svg width="40" height="24" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                          <path d="M21.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V14C0.5 15.1046 1.39543 16 2.5 16H21.5C22.6046 16 23.5 15.1046 23.5 14V2C23.5 0.89543 22.6046 0 21.5 0Z" fill="#3C4454"/>
                          <circle cx="8.5" cy="8" r="4" fill="#EB001B" fillOpacity="0.8"/>
                          <circle cx="15.5" cy="8" r="4" fill="#F79E1B" fillOpacity="0.8"/>
                          <path d="M12 5.5C13.1935 6.69347 13.1935 9.30653 12 10.5C10.8065 9.30653 10.8065 6.69347 12 5.5Z" fill="#FF5F00"/>
                        </svg>
                        <span className="font-medium">Mastercard ending in 8888</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">
                        John Doe<br />
                        Expiry: 08/24
                      </p>
                      
                      <div className="flex space-x-4">
                        <a href="#" className="text-green-500 hover:text-green-600">Edit</a>
                        <a href="#" className="text-green-500 hover:text-green-600">Set as Default</a>
                        <a href="#" className="text-red-500 hover:text-red-600">Remove</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Fresh Strawberries"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">Fresh Strawberries</h3>
                        <p className="text-green-600 font-semibold mb-4">$3.99</p>
                        
                        <div className="flex space-x-2">
                          <button className="btn-primary py-2 px-4 text-sm">
                            Add to Cart
                          </button>
                          <button className="btn-outline py-2 px-4 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src="https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Organic Carrots"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">Organic Carrots</h3>
                        <p className="text-green-600 font-semibold mb-4">$1.49</p>
                        
                        <div className="flex space-x-2">
                          <button className="btn-primary py-2 px-4 text-sm">
                            Add to Cart
                          </button>
                          <button className="btn-outline py-2 px-4 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img
                          src="https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Avocados"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">Avocados</h3>
                        <p className="text-green-600 font-semibold mb-4">$2.99</p>
                        
                        <div className="flex space-x-2">
                          <button className="btn-primary py-2 px-4 text-sm">
                            Add to Cart
                          </button>
                          <button className="btn-outline py-2 px-4 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                  
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-lg mb-4">Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Order Updates</p>
                          <p className="text-sm text-gray-600">Receive updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Promotions</p>
                          <p className="text-sm text-gray-600">Receive emails about promotions and discounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Newsletter</p>
                          <p className="text-sm text-gray-600">Receive our monthly newsletter</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary mt-6">
                      Save Preferences
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Account Actions</h3>
                    
                    <div className="space-y-4">
                      <button className="text-orange-500 hover:text-orange-600 font-medium">
                        Export My Data
                      </button>
                      
                      <div className="block">
                        <button className="text-red-500 hover:text-red-600 font-medium">
                          Delete Account
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;