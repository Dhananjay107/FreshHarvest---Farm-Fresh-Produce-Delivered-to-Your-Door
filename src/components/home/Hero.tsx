import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-green-50 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-200 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 -left-16 w-40 h-40 bg-orange-200 rounded-full opacity-40"></div>
      <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-green-200 rounded-full opacity-60"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-800 leading-tight">
              Fresh <span className="text-green-500">Fruits</span> & <span className="text-orange-500">Vegetables</span> Delivered to Your Door
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Handpicked, farm-fresh produce delivered straight to your doorstep. Shop our wide selection and enjoy the freshest quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="btn btn-primary px-8 py-4 text-center sm:text-left"
              >
                Shop Now <ArrowRight size={18} className="ml-2 inline" />
              </Link>
              
              <Link 
                to="/products/organic" 
                className="btn btn-outline px-8 py-4 text-center sm:text-left"
              >
                Explore Organic
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-poppins font-bold text-xl sm:text-2xl text-green-500">100%</div>
                <div className="text-gray-600 text-sm">Fresh Products</div>
              </div>
              
              <div className="text-center">
                <div className="font-poppins font-bold text-xl sm:text-2xl text-orange-500">24/7</div>
                <div className="text-gray-600 text-sm">Customer Support</div>
              </div>
              
              <div className="text-center">
                <div className="font-poppins font-bold text-xl sm:text-2xl text-yellow-500">Fast</div>
                <div className="text-gray-600 text-sm">Delivery Options</div>
              </div>
            </div>
          </div>
          
          {/* Image area */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-green-200 rounded-organic transform -rotate-6"></div>
              <img 
                src="https://images.pexels.com/photos/3652898/pexels-photo-3652898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Fresh fruits and vegetables" 
                className="relative z-10 rounded-3xl shadow-xl w-full h-auto object-cover"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-4 md:p-6 rounded-xl shadow-lg z-20 fade-in">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-full p-2 md:p-3 mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                      <path d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Same-Day Delivery</div>
                    <div className="text-sm text-gray-500">Order before 3 PM</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-10 -left-10 md:top-16 md:-left-16 bg-white p-4 md:p-6 rounded-xl shadow-lg z-20 fade-in animation-delay-300">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 md:p-3 mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                      <path d="M8.5 14.5L4 10L2.9 11.1L8.5 16.7L21.5 3.7L20.4 2.6L8.5 14.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Quality Guaranteed</div>
                    <div className="text-sm text-gray-500">Farm fresh produce</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="white">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;