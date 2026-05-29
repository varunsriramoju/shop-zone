import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { showToast } = useToast();

  const handleQtyChange = (val) => {
    updateQuantity(item.productId, val);
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
    showToast(`Removed item from cart!`, 'info');
  };

  const total = (item.price || 0) * item.quantity;

  return (
    <div className="cart-item glass">
      <div className="cart-item__img-container">
        <img 
          src={item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'} 
          alt={item.productName} 
          className="cart-item__image"
        />
      </div>
      <div className="cart-item__info">
        <h4 className="cart-item__title">{item.productName || `Product #${item.productId}`}</h4>
        <span className="cart-item__price">${(item.price || 0).toFixed(2)}</span>
        
        <div className="cart-item__controls">
          <div className="cart-item__qty">
            <button onClick={() => handleQtyChange(item.quantity - 1)} className="btn-qty">－</button>
            <span className="qty-num">{item.quantity}</span>
            <button onClick={() => handleQtyChange(item.quantity + 1)} className="btn-qty">＋</button>
          </div>
          <span className="cart-item__total">${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="btn-remove" onClick={handleRemove} title="Remove Item">✕</button>
    </div>
  );
};

export default CartItem;
