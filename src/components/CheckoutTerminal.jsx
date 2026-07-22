import { useEffect, useRef, useState } from 'react';
import './CheckoutTerminal.css';

function CheckoutTerminal({ cart, isOpen, onClose, onNewOrder }) {
  const dialogRef = useRef(null);
  const bodyRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      if (dialog.open) dialog.close();
      setLines([]);
      setIsComplete(false);
      return;
    }

    if (!dialog.open) dialog.showModal();

    // Build the receipt from the current cart snapshot
    const currentTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const currentCount = cart.reduce((sum, item) => sum + item.qty, 0);

    const receiptLines = [
      { text: 'Initiating checkout sequence...', type: 'system' },
      { text: 'Connecting to payment terminal...', type: 'system' },
      { type: 'divider-double' },
      { text: 'TERMINAL SHOP — RECEIPT', type: 'heading' },
      { type: 'divider-double' },
      { type: 'blank' },
      ...cart.map((item, i) => ({
        type: 'item',
        index: String(i + 1).padStart(2, '0'),
        title: item.title,
        qty: item.qty,
        price: (item.price * item.qty).toFixed(2),
      })),
      { type: 'blank' },
      { type: 'divider-single' },
      { type: 'summary', label: 'ITEMS:', value: String(currentCount) },
      { type: 'grand-total', label: 'TOTAL:', value: `$${currentTotal.toFixed(2)}` },
      { type: 'divider-double' },
      { type: 'blank' },
      { text: 'Payment processed successfully.', type: 'success' },
      { text: 'Thank you for shopping at Terminal Shop.', type: 'success' },
    ];

    setLines([]);
    setIsComplete(false);

    const timeouts = receiptLines.map((line, i) =>
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (i === receiptLines.length - 1) {
          setIsComplete(true);
        }
      }, (i + 1) * 80)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isOpen, cart]);

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleNewOrder = () => {
    onNewOrder();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog
      className="checkout-dialog"
      ref={dialogRef}
      id="checkout-terminal"
      onCancel={handleClose}
    >
      {/* Terminal title bar */}
      <div className="checkout-titlebar">
        <div className="checkout-titlebar-dots">
          <span className="dot dot--red" />
          <span className="dot dot--amber" />
          <span className="dot dot--green" />
        </div>
        <span className="checkout-titlebar-text">
          terminal@shop:~$ checkout
        </span>
        <button
          className="checkout-close-x"
          onClick={handleClose}
          aria-label="Close checkout"
        >
          [X]
        </button>
      </div>

      {/* Terminal output body */}
      <div className="checkout-body" ref={bodyRef}>
        {lines.map((line, i) => {
          if (line.type === 'blank') {
            return <div key={i} className="checkout-line checkout-line--blank" />;
          }
          if (line.type === 'divider-double' || line.type === 'divider-single') {
            const styleType = line.type === 'divider-double' ? 'double' : 'single';
            return <div key={i} className={`checkout-line checkout-divider checkout-divider--${styleType}`} />;
          }
          if (line.type === 'item') {
            return (
              <div key={i} className="checkout-line checkout-line--item">
                <div className="checkout-item-main">
                  <span className="checkout-item-index">[{line.index}]</span>
                  <span className="checkout-item-title">{line.title}</span>
                  <span className="checkout-item-qty">x{line.qty}</span>
                </div>
                <span className="checkout-item-price">${line.price}</span>
              </div>
            );
          }
          if (line.type === 'summary' || line.type === 'grand-total') {
            return (
              <div key={i} className={`checkout-line checkout-line--${line.type}`}>
                <span className="checkout-summary-label">{line.label}</span>
                <span className="checkout-summary-value">{line.value}</span>
              </div>
            );
          }
          return (
            <p key={i} className={`checkout-line checkout-line--${line.type}`}>
              {line.text}
            </p>
          );
        })}
        {!isComplete && lines.length > 0 && (
          <p className="checkout-line">
            <span className="cursor-blink">_</span>
          </p>
        )}
      </div>

      {/* Actions */}
      {isComplete && (
        <div className="checkout-actions">
          <button
            className="term-btn"
            onClick={handleClose}
            id="checkout-close-btn"
          >
            [CLOSE]
          </button>
          <button
            className="term-btn term-btn--filled"
            onClick={handleNewOrder}
            id="checkout-new-order-btn"
          >
            [NEW_ORDER]
          </button>
        </div>
      )}
    </dialog>
  );
}

export default CheckoutTerminal;
