import './CartSidebar.css';

function CartSidebar({ cart, isOpen, onClose, onUpdateQty, onRemove, onCheckout }) {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`cart-sidebar ${isOpen ? 'open' : ''}`}
        id="cart-sidebar"
        aria-label="Shopping cart"
      >
        {/* Title bar */}
        <div className="cart-titlebar">
          <span className="cart-titlebar-text">
            cart@terminal:~$
          </span>
          <button
            className="cart-close-btn"
            onClick={onClose}
            id="cart-close-btn"
            aria-label="Close cart"
          >
            [X]
          </button>
        </div>

        {/* Cart contents */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>&gt; Cart is empty.</p>
              <p>&gt; Browse products to add items.</p>
              <p>&gt; <span className="cursor-blink">_</span></p>
            </div>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                  <div className="cart-item-header">
                    <span className="cart-item-title">{item.title}</span>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      [DEL]
                    </button>
                  </div>
                  <div className="cart-item-details">
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)} × {item.qty} = ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      [-]
                    </button>
                    <span className="cart-qty-value">{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      [+]
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>ITEMS:</span>
                <span>{totalItems}</span>
              </div>
              <div className="cart-total-row cart-total-row--grand">
                <span>TOTAL:</span>
                <span className="cart-grand-total">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="term-btn term-btn--filled cart-checkout-btn"
              onClick={onCheckout}
              id="checkout-btn"
            >
              $ checkout --confirm
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartSidebar;
