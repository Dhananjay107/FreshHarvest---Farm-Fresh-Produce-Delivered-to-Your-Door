import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { useProducts } from '../context/ProductContext';
import { ChevronDown, Filter } from 'lucide-react';

const ProductListingPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const { products, categories, getProductsByCategory } = useProducts();
  
  const [displayProducts, setDisplayProducts] = useState(products);
  const [sortOption, setSortOption] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  
  // Find the current category
  const currentCategory = category 
    ? categories.find(c => c.slug === category) 
    : null;
  
  // Set page title
  useEffect(() => {
    document.title = currentCategory 
      ? `${currentCategory.name} | Fresh Harvest` 
      : searchQuery
        ? `Search Results: ${searchQuery} | Fresh Harvest`
        : 'All Products | Fresh Harvest';
  }, [currentCategory, searchQuery]);
  
  // Update displayed products when category changes
  useEffect(() => {
    let filtered = category 
      ? getProductsByCategory(category) 
      : products;
    
    // Apply search if present
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply filters
    if (selectedCategories.length > 0 && !category) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category) ||
        product.tags.some(tag => selectedCategories.includes(tag))
      );
    }
    
    // Apply price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order for 'featured'
        break;
    }
    
    setDisplayProducts(filtered);
  }, [category, products, searchQuery, sortOption, selectedCategories, priceRange, getProductsByCategory]);
  
  // Find max price in all products
  const maxPrice = Math.max(...products.map(p => p.price)) + 1;
  
  // Handle category filter change
  const handleCategoryChange = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(c => c !== slug) 
        : [...prev, slug]
    );
  };
  
  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, parseFloat(e.target.value)]);
  };
  
  return (
    <div className="pt-28">
      {/* Banner */}
      <div className="bg-green-50 py-10">
        <div className="container-custom">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            {searchQuery
              ? `Search Results: "${searchQuery}"`
              : currentCategory
                ? currentCategory.name
                : 'All Products'}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : currentCategory
                ? currentCategory.description
                : 'Browse our full selection of fresh, high-quality fruits and vegetables.'}
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Toggle */}
          <div className="block md:hidden mb-4">
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg"
            >
              <span className="flex items-center"><Filter size={18} className="mr-2" /> Filters</span>
              <ChevronDown size={18} className={`transform transition ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Sidebar Filters */}
          <div className={`w-full md:w-1/4 lg:w-1/5 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${cat.slug}`}
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => handleCategoryChange(cat.slug)}
                      className="rounded text-green-500 focus:ring-green-500 mr-2"
                    />
                    <label htmlFor={`cat-${cat.slug}`} className="text-gray-700">
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="0.5"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">${priceRange[0].toFixed(2)}</span>
                  <span className="text-gray-600">${priceRange[1].toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Sorting and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              <div className="flex-shrink-0">
                <select
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <path d="M10.8 5.2C10.3582 5.2 10 5.55817 10 6C10 6.44183 10.3582 6.8 10.8 6.8H13.2C13.6418 6.8 14 6.44183 14 6C14 5.55817 13.6418 5.2 13.2 5.2H10.8Z" fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="currentColor"/>
                    <path d="M15.8227 15.1772C16.0607 14.9393 16.0607 14.5607 15.8227 14.3227L14.3493 12.8493C16.4172 10.5732 15.5233 7.14868 12.8446 5.93005C10.166 4.71142 7.0161 6.14286 6.38343 9.02334C5.75075 11.9038 7.89379 14.6357 10.8446 14.9304C12.1611 15.053 13.4773 14.6568 14.5097 13.8097L16.0331 15.3331C16.2711 15.5711 16.6497 15.5711 16.8877 15.3331L15.8227 15.1772ZM9.5 12.5C8.11929 12.5 7 11.3807 7 10C7 8.61929 8.11929 7.5 9.5 7.5C10.8807 7.5 12 8.61929 12 10C12 11.3807 10.8807 12.5 9.5 12.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;