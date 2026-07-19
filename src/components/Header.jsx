import './Header.css';

function Header({ cartItemCount, onCartToggle }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-logo">
          <span className="header-logo-prompt">&gt;</span>
          {' TERMINAL'}
          <span className="header-logo-sep">_</span>
          {'SHOP'}
          <span className="cursor-blink">_</span>
        </h1>

        <button
          className="cart-toggle"
          onClick={onCartToggle}
          id="cart-toggle-btn"
          aria-label={`Shopping cart with ${cartItemCount} items`}
        >
          <span className="cart-toggle-bracket">[</span>
          <span className="cart-toggle-label"> CART</span>
          {cartItemCount > 0 && (
            <span className="cart-toggle-count">({cartItemCount})</span>
          )}
          <span className="cart-toggle-bracket"> ]</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
