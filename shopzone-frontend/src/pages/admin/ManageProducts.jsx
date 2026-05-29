import React, { useEffect, useState } from 'react';
import productApi from '../../api/productApi';
import { useToast } from '../../context/ToastContext';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(10);
  const [categoryId, setCategoryId] = useState(1);
  const [editingId, setEditingId] = useState(null);
  
  const { showToast } = useToast();

  const fetchProducts = () => {
    productApi.getAll(0, 50)
      .then(res => {
        const productData = res.data.content ? res.data.content : res.data;
        setProducts(productData || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, price: parseFloat(price), description, imageUrl, stock: parseInt(stock, 10), categoryId: parseInt(categoryId, 10) };
    try {
      if (editingId) {
        await productApi.update(editingId, payload);
        showToast('Product updated successfully!', 'success');
      } else {
        await productApi.create(payload);
        showToast('Product added to catalog!', 'success');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast('Error saving product data', 'error');
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description || '');
    setImageUrl(p.imageUrl || '');
    setStock(p.stock || 10);
    setCategoryId(p.categoryId || 1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.delete(id);
      showToast('Product removed from catalog', 'info');
      fetchProducts();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Could not delete product. It might be linked to existing orders.';
      showToast(errorMsg, 'error');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setStock(10);
    setCategoryId(1);
  };

  return (
    <div className="page-container">
      <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Catalog Management</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        {/* Creation/Editing Form */}
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
            {editingId ? 'Edit Product Specifications' : 'Add New Release'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Item Title</label>
              <input type="text" placeholder="Premium Smartwatch" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Retail Price ($)</label>
              <input type="number" step="0.01" placeholder="299.99" value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input type="url" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="form-input" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Category ID</label>
                <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-input" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Product Specs / Summary</label>
              <textarea placeholder="Advanced features details..." value={description} onChange={(e) => setDescription(e.target.value)} className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                {editingId ? 'Update Info' : 'Publish Item'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Products List Grid Table */}
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.25rem', marginBottom: '1.5rem' }}>Catalog Registry</h3>
          
          {loading ? (
            <div className="skeleton" style={{ height: '300px' }} />
          ) : products.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No items in repository.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Product</th>
                  <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Price</th>
                  <th style={{ padding: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: '600' }}>{p.name}</td>
                    <td style={{ padding: '1rem 0.75rem', color: 'var(--secondary)', fontWeight: '700' }}>${p.price.toFixed(2)}</td>
                    <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                      <button onClick={() => handleEdit(p)} className="btn btn-secondary btn-sm" style={{ marginRight: '0.5rem' }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
