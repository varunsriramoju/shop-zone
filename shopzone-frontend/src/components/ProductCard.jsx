import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      showToast('Please log in to add items to your cart', 'info');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product, 1);
      showToast(`Added ${product.name} to cart!`, 'success');
    } catch (_) {
      // error handled in CartContext
    }
  };

  return (
    <div className="product-card glass">
      <div className="product-card__img-container">
        <img 
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'} 
          alt={product.name} 
          className="product-image" 
        />
        <div className="product-card__overlay">
          <button onClick={handleAdd} className="btn btn-primary btn-add-icon">
            ＋ Add to Cart
          </button>
        </div>
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__desc">{product.description || 'Premium curated collection item.'}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${(product.price || 0).toFixed(2)}</span>
          <Link to={`/shop/product/${product.id}`} className="btn btn-secondary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
