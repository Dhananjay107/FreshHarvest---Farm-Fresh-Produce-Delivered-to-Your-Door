import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
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
                <span className="font-poppins font-bold text-xl text-green-600">
                  Fresh
                </span>
                <span className="font-poppins font-bold text-xl text-orange-500">
                  Harvest
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Delivering farm-fresh fruits and vegetables straight to your doorstep. Quality produce for a healthy lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-500 transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-green-500 transition">Shop</Link>
              </li>
              <li>
                <Link to="/products/organic" className="text-gray-600 hover:text-green-500 transition">Organic Products</Link>
              </li>
              <li>
                <Link to="/products/seasonal" className="text-gray-600 hover:text-green-500 transition">Seasonal Specials</Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-600 hover:text-green-500 transition">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> hello@freshharvest.com
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Address:</span> 123 Fresh Lane, Harvest Valley, CA 98765
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Hours:</span> Mon-Sat: 8AM - 8PM
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to receive updates on fresh arrivals and special offers.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="input-field"
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Fresh Harvest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-green-500 transition text-sm">
                Privacy Policy
              </Link>
              <Link to="/" className="text-gray-600 hover:text-green-500 transition text-sm">
                Terms of Service
              </Link>
              <Link to="/" className="text-gray-600 hover:text-green-500 transition text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;