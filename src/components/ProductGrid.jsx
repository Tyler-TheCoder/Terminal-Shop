import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, loading, error, onAddToCart }) {
  if (loading) {
    return (
      <div className="terminal-status">
        <p className="terminal-status-line">
          &gt; Fetching products from remote server...
        </p>
        <p className="terminal-status-line">
          &gt; <span className="cursor-blink">_</span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="terminal-status terminal-status--error">
        <p className="terminal-status-line">
          &gt; <span className="terminal-error-tag">ERROR:</span> {error}
        </p>
        <p className="terminal-status-line">
          &gt; Connection failed. Please try again.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="terminal-status">
        <p className="terminal-status-line">
          &gt; No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid" id="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
