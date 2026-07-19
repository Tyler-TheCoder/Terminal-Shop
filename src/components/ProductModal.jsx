import { useEffect, useRef, useState } from 'react';
import './ProductModal.css';

function ProductModal({ product, onClose, onAddToCart }) {
  const dialogRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product) {
      setCurrentImageIndex(0); // Reset gallery index when opening new product
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [product]);

  if (!product) return null;

  const images = product.images || [product.thumbnail];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <dialog
      className="product-modal"
      ref={dialogRef}
      onCancel={handleClose}
      onClick={(e) => {
        // Light dismiss if clicking directly on the backdrop
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="product-modal-inner">
        {/* Title bar */}
        <div className="product-modal-titlebar">
          <span className="product-modal-title">
            SYS_LOG // PRODUCT_DETAILS // [{product.id}]
          </span>
          <button className="product-modal-close" onClick={handleClose} aria-label="Close modal">
            [X]
          </button>
        </div>

        {/* Content */}
        <div className="product-modal-content">
          <div className="product-modal-gallery">
            <div className="product-modal-main-img-wrap">
              <img
                src={images[currentImageIndex]}
                alt={`${product.title} view ${currentImageIndex + 1}`}
                className="product-modal-main-img"
              />
              <div className="product-modal-img-overlay" />
            </div>
            
            {hasMultipleImages && (
              <div className="product-modal-gallery-controls">
                <button className="term-btn gallery-btn" onClick={prevImage}>[&lt;]</button>
                <span className="gallery-indicator">
                  IMG_{currentImageIndex + 1}/{images.length}
                </span>
                <button className="term-btn gallery-btn" onClick={nextImage}>[&gt;]</button>
              </div>
            )}
          </div>

          <div className="product-modal-details">
            <h2 className="product-modal-name">{product.title}</h2>
            {product.brand && (
              <p className="product-modal-brand">BRAND: {product.brand}</p>
            )}
            <p className="product-modal-price">${product.price.toFixed(2)}</p>
            
            <div className="product-modal-desc-box">
              <p className="product-modal-desc-title">--- DESCRIPTION ---</p>
              <p className="product-modal-desc">{product.description}</p>
            </div>

            <div className="product-modal-actions">
              <button 
                className="term-btn term-btn--filled product-modal-add"
                onClick={handleAddToCart}
              >
                [ADD_TO_CART]
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ProductModal;
