import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    productApi.getById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    if (!user) {
      showToast('Please log in to add items to your cart', 'info');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product, quantity);
      showToast(`Added ${quantity} x ${product.name} to cart!`, 'success');
    } catch (_) {
      // handled in CartContext
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container" style={{ textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/shop" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        ← Back to Shop
      </Link>
      
      <div className="glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)' }}>
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'} 
            alt={product.name} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{product.name}</h2>
          <span className="product-card__price" style={{ fontSize: '2rem', display: 'block', marginBottom: '1.5rem' }}>
            ${(product.price || 0).toFixed(2)}
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1.05rem' }}>
            {product.description || 'Elevate your daily accessories game with this sleek designer collection staple. Expertly engineered, carefully tested, and strictly vetted for premium specifications.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ fontWeight: '600' }}>Quantity:</span>
            <div className="glass" style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 1rem', border: 'none', background: 'transparent' }}
              >
                －
              </button>
              <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '700' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 1rem', border: 'none', background: 'transparent' }}
              >
                ＋
              </button>
            </div>
          </div>

          <button onClick={handleAdd} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
