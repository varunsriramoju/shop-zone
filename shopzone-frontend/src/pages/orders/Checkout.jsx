import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import orderApi from "../../api/orderApi";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const Checkout = () => {
  const { cartItems, resetCart, cartTotal } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    if (!address.trim()) {
      showToast("Please enter a shipping address", "error");
      return;
    }
    setLoading(true);
    try {
      await orderApi.create(address.trim());
      resetCart();
      showToast("Order placed successfully! Check history.", "success");
      navigate("/orders/history");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to place order. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px' }}>
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Secure Checkout</h2>
      
      <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Review</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {cartItems.map(item => (
            <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: '600' }}>{item.productName}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>x {item.quantity}</span>
              </div>
              <span style={{ fontWeight: '600', color: 'var(--secondary)' }}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" htmlFor="address">Shipping Address</label>
          <textarea
            id="address"
            className="form-input"
            placeholder="Street, city, state, ZIP..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.25rem', marginBottom: '2rem' }}>
          <span>Grand Total</span>
          <span className="text-gradient">${cartTotal.toFixed(2)}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={handleCheckout} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? 'Processing Order...' : 'Confirm Order'}
          </button>
          
          <Link to="/cart" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
            Modify Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
