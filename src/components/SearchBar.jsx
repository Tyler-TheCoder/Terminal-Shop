import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus on '/' or 'Ctrl+K' / 'Cmd+K'
      if (
        e.key === '/' || 
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')
      ) {
        // Prevent default browser behavior (e.g., Firefox Quick Find or Chrome search)
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  const handleClear = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar-container">
      <label htmlFor="search-input" className="search-prompt">&gt;</label>
      <input
        id="search-input"
        ref={inputRef}
        className="search-input"
        type="text"
        placeholder="Search products... (Press '/' to focus)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
      />
      {inputValue && (
        <button className="search-clear-btn" onClick={handleClear} aria-label="Clear search">
          [X]
        </button>
      )}
    </div>
  );
}

export default SearchBar;
