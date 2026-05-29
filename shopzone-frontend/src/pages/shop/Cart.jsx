import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const { cartItems, clearCart, cartTotal } = useCart();

  return (
    <div className="page-container">
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Your Basket</h2>

      {cartItems.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '3rem' }}>🛒</span>
          <h3 style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>Your Cart is Empty</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Explore products and grab premium collections.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Browse Shop</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Cart Items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>

          {/* Checkout summary container */}
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', marginBottom: '1.5rem' }}>Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--success)' }}>FREE</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              <span>Total</span>
              <span className="text-gradient">${cartTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/orders/checkout" className="btn btn-primary" style={{ width: '100%' }}>
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="btn btn-secondary" style={{ width: '100%' }}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
