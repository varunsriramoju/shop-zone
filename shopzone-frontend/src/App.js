import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/shop/Home';
import ProductList from './pages/shop/ProductList';
import ProductDetail from './pages/shop/ProductDetail';
import CartPage from './pages/shop/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Checkout from './pages/orders/Checkout';
import OrderHistory from './pages/orders/OrderHistory';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import './App.css';
import './context/Toast.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <div style={{ flexGrow: 1 }}>
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<ProductList />} />
                  <Route path="/shop/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders/checkout" element={<Checkout />} />
                    <Route path="/orders/history" element={<OrderHistory />} />
                  </Route>

                  {/* Admin */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/products" element={<ManageProducts />} />
                    <Route path="/admin/orders" element={<ManageOrders />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
