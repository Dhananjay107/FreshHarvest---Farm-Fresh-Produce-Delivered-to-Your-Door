import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-green-600 mr-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17.9999C7 18.5499 6.55 18.9999 6 18.9999C5.45 18.9999 5 18.5499 5 17.9999C5 17.4499 5.45 16.9999 6 16.9999C6.55 16.9999 7 17.4499 7 17.9999Z" fill="currentColor"/>
                <path d="M17 18.9999C17 19.5499 16.55 19.9999 16 19.9999C15.45 19.9999 15 19.5499 15 18.9999C15 18.4499 15.45 17.9999 16 17.9999C16.55 17.9999 17 18.4499 17 18.9999Z" fill="currentColor"/>
                <path d="M20.88 13.5C20.67 14.11 20.15 14.5 19.5 14.5H6.37C5.72 14.5 5.23 14.13 5.03 13.53L3 5.5H1C0.45 5.5 0 5.05 0 4.5C0 3.95 0.45 3.5 1 3.5H3.65C4.02 3.5 4.36 3.72 4.48 4.07L6.83 13.5H19.5L22 7H11C10.45 7 10 6.55 10 6C10 5.45 10.45 5 11 5H23.64C24.3 5 24.49 5.31 24.59 5.52C24.69 5.72 24.77 6.06 24.5 6.63L20.88 13.5Z" fill="currentColor"/>
                <path d="M8.88 8.87988C9.15 9.14988 9.15 9.59988 8.88 9.86988L7.87 10.8799C7.6 11.1499 7.15 11.1499 6.88 10.8799C6.61 10.6099 6.61 10.1599 6.88 9.88988L7.89 8.87988C8.16 8.60988 8.61 8.60988 8.88 8.87988Z" fill="currentColor"/>
                <path d="M15.88 8.87988C16.15 8.60988 16.6 8.60988 16.87 8.87988L17.88 9.88988C18.15 10.1599 18.15 10.6099 17.88 10.8799C17.61 11.1499 17.16 11.1499 16.89 10.8799L15.88 9.86988C15.61 9.59988 15.61 9.14988 15.88 8.87988Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <span className={`font-poppins font-bold text-xl ${isScrolled ? 'text-green-600' : 'text-green-600'}`}>
                Fresh
              </span>
              <span className={`font-poppins font-bold text-xl ${isScrolled ? 'text-orange-500' : 'text-orange-500'}`}>
                Harvest
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium hover:text-green-500 transition ${
                location.pathname === '/' ? 'text-green-500' : isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium hover:text-green-500 transition ${
                location.pathname.includes('/products') ? 'text-green-500' : isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/products/organic" 
              className={`font-medium hover:text-green-500 transition ${
                location.pathname.includes('/organic') ? 'text-green-500' : isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
            >
              Organic
            </Link>
            <Link 
              to="/products/seasonal" 
              className={`font-medium hover:text-green-500 transition ${
                location.pathname.includes('/seasonal') ? 'text-green-500' : isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
            >
              Seasonal
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-white/20'
              } mr-1`}
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/account" 
              className={`p-2 rounded-full ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-white/20'
              } mr-1`}
            >
              <User size={20} />
            </Link>
            
            <Link 
              to="/cart" 
              className={`p-2 rounded-full relative ${
                isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-600 hover:bg-white/20'
              }`}
            >
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="ml-4 p-2 rounded-full md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pt-4 pb-2">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium hover:text-green-500 transition ${
                  location.pathname === '/' ? 'text-green-500' : 'text-gray-800'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`font-medium hover:text-green-500 transition ${
                  location.pathname.includes('/products') ? 'text-green-500' : 'text-gray-800'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/products/organic" 
                className={`font-medium hover:text-green-500 transition ${
                  location.pathname.includes('/organic') ? 'text-green-500' : 'text-gray-800'
                }`}
              >
                Organic
              </Link>
              <Link 
                to="/products/seasonal" 
                className={`font-medium hover:text-green-500 transition ${
                  location.pathname.includes('/seasonal') ? 'text-green-500' : 'text-gray-800'
                }`}
              >
                Seasonal
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;