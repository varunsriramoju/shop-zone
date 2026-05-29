import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import cartApi from '../api/cartApi';
import { AuthContext } from './AuthContext';
import { useToast } from './ToastContext';

export const CartContext = createContext(null);

const mapCartResponse = (cart) =>
  (cart?.items || []).map((item) => ({
    id: item.id,
    productId: item.product?.id,
    productName: item.product?.name,
    price: Number(item.product?.price ?? 0),
    imageUrl: item.product?.imageUrl,
    quantity: item.quantity,
  }));

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  const loadCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      const res = await cartApi.getCart();
      setCartItems(mapCartResponse(res.data));
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart, user]);

  const addToCart = async (product, quantity = 1) => {
    const productId = product.id || product.productId;
    try {
      const res = await cartApi.addItem(productId, quantity);
      setCartItems(mapCartResponse(res.data));
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to add to cart', 'error');
      throw err;
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const res = await cartApi.updateItem(item.id, newQuantity);
      setCartItems(mapCartResponse(res.data));
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to update quantity', 'error');
    }
  };

  const removeFromCart = async (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    try {
      const res = await cartApi.updateItem(item.id, 0);
      setCartItems(mapCartResponse(res.data));
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to remove item', 'error');
    }
  };

  const clearCart = async () => {
    try {
      await cartApi.clearCart();
      setCartItems([]);
      showToast('Cart cleared', 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to clear cart', 'error');
    }
  };

  const resetCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    resetCart,
    loadCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartContext;
