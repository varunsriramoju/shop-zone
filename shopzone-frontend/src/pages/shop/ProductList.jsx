import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCard from "../../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    productApi.getAll(0, 50)
      .then((res) => {
        const productData = res.data.content ? res.data.content : res.data;
        setProducts(productData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <h2 className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800' }}>Discover Collection</h2>
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ maxWidth: '320px' }}
        />
      </div>

      {loading ? (
        <div className="grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="glass skeleton" style={{ height: '380px', borderRadius: 'var(--radius-md)' }} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <h3 style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>No Items Match Your Search</h3>
          <p style={{ marginTop: '0.5rem' }}>Try looking for a different term or clear filters.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
