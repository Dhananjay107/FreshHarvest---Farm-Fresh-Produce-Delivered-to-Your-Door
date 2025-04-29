import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoSection from '../components/home/PromoSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Fresh Harvest - Farm Fresh Fruits & Vegetables';
  }, []);

  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <TestimonialsSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;