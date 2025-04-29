import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Page Not Found | Fresh Harvest';
  }, []);

  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-9xl font-poppins font-bold text-gray-200 mb-8">404</h1>
          
          <h2 className="text-3xl font-poppins font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            Oops! It seems the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              <Home size={18} className="mr-2" /> Back to Home
            </Link>
            
            <Link to="/products" className="btn btn-outline">
              <Search size={18} className="mr-2" /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;