import './ProductCard.css';

function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <article 
      className="product-card" 
      id={`product-${product.id}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="product-card-img-wrap">
        <img
          className="product-card-img"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <div className="product-card-img-overlay" />
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="term-btn product-card-add"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            id={`add-to-cart-${product.id}`}
          >
            [ADD_TO_CART]
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
