import React, { createContext, useState, useContext, useEffect } from 'react';
import { productsData } from '../data/products';
import { categoriesData } from '../data/categories';
import { Product, Category } from '../types/product';

type ProductContextType = {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  getProductsByCategory: (category: string) => Product[];
  getProductById: (id: number) => Product | undefined;
  searchProducts: (query: string) => Product[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(productsData);
  const [categories] = useState<Category[]>(categoriesData);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Set featured products on initial load
  useEffect(() => {
    // Get products marked as featured or select 4 random products
    const featured = products.filter(product => product.featured);
    
    if (featured.length >= 4) {
      setFeaturedProducts(featured.slice(0, 8));
    } else {
      // If not enough featured products, add some random ones
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 8 - featured.length);
      
      setFeaturedProducts([...featured, ...randomProducts]);
    }
  }, [products]);

  // Get products by category
  const getProductsByCategory = (categorySlug: string): Product[] => {
    if (categorySlug === 'all') {
      return products;
    }
    return products.filter(product => 
      product.category === categorySlug || 
      product.tags.includes(categorySlug)
    );
  };

  // Get product by ID
  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  // Search products
  const searchProducts = (query: string): Product[] => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return [];
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        featuredProducts,
        getProductsByCategory,
        getProductById,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};