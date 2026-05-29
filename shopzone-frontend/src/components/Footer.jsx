import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section brand-section">
          <h3 className="footer__brand text-gradient">ShopZone</h3>
          <p className="footer__desc">
            Elevating your digital shopping experience with premium curated collections and glassmorphic interactivity.
          </p>
        </div>
        
        <div className="footer__section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/orders/history">Order History</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#support">24/7 Support</a></li>
            <li><a href="#shipping">Secure Shipping</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} ShopZone. All rights reserved. Made with love.</p>
      </div>
    </footer>
  );
};

export default Footer;
