import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" onClick={() => setIsOpen(false)}>
          <span className="text-gradient">ShopZone</span>
        </Link>

        {/* Mobile Hamburger Trigger */}
        <button className={`navbar__hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__menu ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/shop" className="navbar__link" onClick={() => setIsOpen(false)}>Shop</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/cart" className="navbar__link navbar__cart-link" onClick={() => setIsOpen(false)}>
                  Cart
                  {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
                </Link>
              </li>
              <li>
                <Link to="/orders/history" className="navbar__link" onClick={() => setIsOpen(false)}>Orders</Link>
              </li>
              {user.role === 'ADMIN' && (
                <li>
                  <Link to="/admin" className="navbar__link navbar__admin-link" onClick={() => setIsOpen(false)}>Admin</Link>
                </li>
              )}
              <li className="navbar__user-section">
                <span className="navbar__user-email">{user.email || 'User'}</span>
                <button className="btn btn-secondary btn-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login" className="navbar__link" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
