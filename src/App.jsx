import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutTerminal from './components/CheckoutTerminal';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const [laptopsRes, accessoriesRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/laptops'),
          fetch('https://dummyjson.com/products/category/mobile-accessories')
        ]);

        if (!laptopsRes.ok || !accessoriesRes.ok) {
          throw new Error('Failed to fetch product data');
        }

        const laptopsData = await laptopsRes.json();
        const accessoriesData = await accessoriesRes.json();

        // Extract products arrays and tag them
        const laptops = laptopsData.products.map(item => ({ ...item, category: 'laptops' }));
        const accessories = accessoriesData.products.map(item => ({ ...item, category: 'accessories' }));

        setProducts([...laptops, ...accessories]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch search data
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setIsSearching(true);
        setSearchError(null);
        
        const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
        if (!res.ok) {
          throw new Error('Search failed');
        }
        
        const data = await res.json();
        setSearchResults(data.products);
      } catch (err) {
        setSearchError(err.message);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleNewOrder = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Derived state
  const isSearchActive = searchQuery.length > 0;
  const displayProducts = isSearchActive ? searchResults : products;
  
  const filteredProducts = activeCategory === 'all' 
    ? displayProducts 
    : displayProducts.filter(p => {
        const cat = p.category === 'mobile-accessories' ? 'accessories' : p.category;
        return cat === activeCategory;
      });

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const currentLoading = isSearchActive ? isSearching : loading;
  const currentError = isSearchActive ? searchError : error;

  return (
    <>
      <Header 
        cartItemCount={cartItemCount} 
        onCartToggle={() => setIsCartOpen(!isCartOpen)} 
      />
      
      <main style={{ flex: 1, padding: '0 1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <SearchBar onSearch={setSearchQuery} />

        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <ProductGrid 
          products={filteredProducts} 
          loading={currentLoading} 
          error={currentError} 
          onAddToCart={handleAddToCart}
          onProductClick={setSelectedProduct}
          isSearching={isSearchActive}
        />
      </main>

      <Footer />

      <CartSidebar 
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutTerminal 
        cart={cart}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onNewOrder={handleNewOrder}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product) => {
          handleAddToCart(product);
          setSelectedProduct(null); // Optional: close modal when adding to cart
        }}
      />
    </>
  );
}

export default App;
