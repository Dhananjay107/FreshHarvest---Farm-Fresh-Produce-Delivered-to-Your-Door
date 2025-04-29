import React from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon, ThumbsUp, Award } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <img
            src="https://images.pexels.com/photos/1508666/pexels-photo-1508666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Fresh organic produce"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
            <div className="p-8 md:p-12 lg:p-16 max-w-xl">
              <h2 className="text-white font-poppins font-bold text-3xl md:text-4xl mb-4">
                20% Off on All Organic Products
              </h2>
              <p className="text-white/90 mb-6">
                Enjoy the freshness of organic fruits and vegetables at special discount prices. 
                Limited time offer!
              </p>
              <Link to="/products/organic" className="btn bg-white text-green-600 hover:bg-green-50">
                Shop Organic
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-2xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-2">
            <div className="bg-green-500 text-white p-4 rounded-full mb-6">
              <TruckIcon size={32} />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">Free Home Delivery</h3>
            <p className="text-gray-600">
              We offer free delivery on orders over $50. Your fresh produce will arrive at your doorstep at your chosen time slot.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-2">
            <div className="bg-orange-500 text-white p-4 rounded-full mb-6">
              <ThumbsUp size={32} />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">100% Satisfaction</h3>
            <p className="text-gray-600">
              Not happy with the quality? We offer full refunds or replacements to ensure you're completely satisfied.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-2">
            <div className="bg-yellow-500 text-white p-4 rounded-full mb-6">
              <Award size={32} />
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">Premium Quality</h3>
            <p className="text-gray-600">
              We source directly from verified farms and quality check every item to ensure you get the best produce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;