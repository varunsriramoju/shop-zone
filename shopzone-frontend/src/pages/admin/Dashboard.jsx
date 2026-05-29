import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productApi from "../../api/productApi";
import orderApi from "../../api/orderApi";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          productApi.getAll(0, 1000), // Get a large page to count products, or we could use totalElements
          orderApi.getAllAdmin()
        ]);
        
        const productsCount = prodRes.data.totalElements || (prodRes.data.content ? prodRes.data.content.length : prodRes.data.length) || 0;
        const ordersList = ordRes.data || [];
        const ordersCount = ordersList.length;
        const revenue = ordersList.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        setStats({ products: productsCount, orders: ordersCount, revenue });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Admin Portal</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Management workspace and administrative metrics.</p>

      {/* Overview stats cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '2rem' }}>📦</span>
          <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', marginTop: '1rem' }}>Products Catalog</h4>
          <p style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
            {loading ? "..." : `${stats.products} Active`}
          </p>
        </div>
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '2rem' }}>🛒</span>
          <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', marginTop: '1rem' }}>Total Orders</h4>
          <p style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
            {loading ? "..." : `${stats.orders} Orders`}
          </p>
        </div>
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ fontSize: '2rem' }}>💰</span>
          <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', marginTop: '1rem' }}>Gross Revenue</h4>
          <p style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginTop: '0.5rem', color: 'var(--success)' }}>
            {loading ? "..." : `$${stats.revenue.toFixed(2)}`}
          </p>
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.5rem', marginBottom: '2rem' }}>Management Quicklinks</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <Link to="/admin/products" className="glass" style={{ padding: '2.5rem 2rem', textDecoration: 'none', color: 'inherit', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Manage Products →</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Add new catalog releases, update specifications, pricing data, and stock tags.</p>
        </Link>
        
        <Link to="/admin/orders" className="glass" style={{ padding: '2.5rem 2rem', textDecoration: 'none', color: 'inherit', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Manage Orders →</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Review customer checkouts, dispatch items, update timelines and trace billing addresses.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
