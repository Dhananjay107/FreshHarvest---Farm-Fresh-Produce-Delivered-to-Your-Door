import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

const CategorySection: React.FC = () => {
  const { categories } = useProducts();

  // Only display the first 6 categories
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of fresh fruits and vegetables, sorted by category to make your shopping experience seamless.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/products/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-transform hover:-translate-y-1 fade-in"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="font-poppins font-semibold text-white text-lg md:text-xl">
                    {category.name}
                  </h3>
                  <span className="text-white/80 text-sm">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="btn btn-outline inline-flex items-center"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;