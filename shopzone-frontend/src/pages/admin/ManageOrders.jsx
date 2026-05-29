import React, { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { useToast } from '../../context/ToastContext';

const getItemName = (item) =>
  item.product?.name || item.productName || `Item #${item.product?.id || item.productId}`;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    orderApi.getAllAdmin()
      .then(res => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await orderApi.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? res.data : o));
      showToast(`Order #${orderId} status updated to ${newStatus}!`, 'success');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to update order status', 'error');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm(`Delete order #${orderId}? This cannot be undone.`)) return;
    try {
      await orderApi.delete(orderId);
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast(`Order #${orderId} deleted`, 'info');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to delete order', 'error');
    }
  };

  return (
    <div className="page-container">
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Order Management</h2>

      <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
        {loading ? (
          <div className="skeleton" style={{ height: '300px' }} />
        ) : orders.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No orders placed yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Order ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Purchased Items</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Price Total</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Dispatch Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: '600' }}>#{o.id}</td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {o.items && o.items.map((item, idx) => (
                        <span key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          • {getItemName(item)} (x{item.quantity})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: '700', color: 'var(--secondary)' }}>
                    ${(o.totalAmount || o.total || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span className={`badge ${o.status === 'SHIPPED' || o.status === 'DELIVERED' ? 'badge-success' : o.status === 'CANCELLED' ? 'badge-pending' : 'badge-pending'}`}>
                      {o.status || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center' }}>
                      <select
                        value={o.status || 'PENDING'}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="form-input"
                        style={{ maxWidth: '150px', padding: '0.4rem 0.5rem', fontSize: '0.85rem' }}
                        disabled={o.status === 'CANCELLED'}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(o.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
