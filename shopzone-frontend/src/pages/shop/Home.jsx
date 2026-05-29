import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="home-hero__glow"></div>
      <div className="home-hero__content">
        <h1 className="home-hero__title">
          Discover Next-Gen <br />
          <span className="text-gradient">Premium Shopping</span>
        </h1>
        <p className="home-hero__subtitle">
          Explore elite collections designed for the modern lifestyle. Immersive speed, glassmorphic interfaces, and secure processing.
        </p>
        <div className="home-hero__actions">
          <Link to="/shop" className="btn btn-primary btn-hero">
            Shop Collection
          </Link>
          <a href="#features" className="btn btn-secondary btn-hero">
            Learn More
          </a>
        </div>
      </div>

      <div id="features" className="home-features">
        <div className="feature-card glass">
          <div className="feature-icon">🚀</div>
          <h3>Ultra Fast Dispatch</h3>
          <p>We process all premium orders under 24 hours with certified Express couriers.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">🔒</div>
          <h3>Encrypted Checkouts</h3>
          <p>Your transactions are shielded via modern banking standards and end-to-end security layers.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">💎</div>
          <h3>Signature Quality</h3>
          <p>Carefully vetted products offering high-performance, durability, and standard warranty.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
