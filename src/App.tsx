import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { OrderProvider } from './context/OrderContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ChatWidget from './components/chat/ChatWidget';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <SubscriptionProvider>
            <OrderProvider>
              <ChatProvider>
                <div className="flex flex-col min-h-screen bg-white">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductListingPage />} />
                      <Route path="/products/:category" element={<ProductListingPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ChatWidget />
                </div>
              </ChatProvider>
            </OrderProvider>
          </SubscriptionProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;