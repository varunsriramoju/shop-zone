import React, { useEffect, useState } from "react";
import orderApi from '../../api/orderApi';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const getItemName = (item) =>
  item.product?.name || item.productName || `Item #${item.product?.id || item.productId}`;

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'DELIVERED':
    case 'SHIPPED':
      return 'badge-success';
    case 'CANCELLED':
      return 'badge-pending';
    default:
      return 'badge-pending';
  }
};

const canCancel = (status) => status === 'PENDING' || status === 'PROCESSING';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchOrders = () => {
    setLoading(true);
    orderApi.getAll()
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm(`Cancel order #${orderId}?`)) return;
    try {
      const res = await orderApi.cancel(orderId);
      setOrders(prev => prev.map(o => o.id === orderId ? res.data : o));
      showToast('Order cancelled successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Could not cancel order', 'error');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Your Orders</h2>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[1, 2].map(n => (
            <div key={n} className="glass skeleton" style={{ height: '100px', borderRadius: 'var(--radius-md)' }} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem' }}>📦</span>
          <h3 style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>No Orders Placed Yet</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Items you checkout will show up here.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((o) => (
            <div key={o.id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.1rem' }}>Order #{o.id}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {new Date(o.createdAt || Date.now()).toLocaleString()}
                </p>
                {o.address && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Ship to: {o.address}
                  </p>
                )}
                <div style={{ marginTop: '1rem' }}>
                  {o.items && o.items.map((item, idx) => (
                    <span key={idx} style={{ fontSize: '0.85rem', background: 'var(--bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: '4px', marginRight: '0.5rem', marginBottom: '0.25rem', display: 'inline-block' }}>
                      {getItemName(item)} (x{item.quantity})
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                <span className={`badge ${getStatusBadgeClass(o.status)}`}>
                  {o.status || 'PENDING'}
                </span>
                <p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--secondary)', fontFamily: 'var(--font-display)', margin: 0 }}>
                  ${(o.totalAmount || o.total || 0).toFixed(2)}
                </p>
                {canCancel(o.status) && (
                  <button
                    type="button"
                    onClick={() => handleCancel(o.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
