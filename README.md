# &gt; TERMINAL_SHOP_

A retro, command-line interface (CLI) themed shopping application built with React and Vite. It features a fully functional shopping cart, product filtering, a debounce-optimized search, and a unique terminal-log checkout experience.

## Features

- **Retro Terminal Aesthetic**: Pure black backgrounds (`#000000`), glowing terminal green text (`#39FF14`), monospaced fonts, and zero-radius borders to mimic classic CRT monitors.
- **Product Search & Filtering**: Includes a custom search bar with a 300ms debounce that queries the live remote database, alongside category filters.
- **Dynamic Product Data**: Fetches and renders laptops and mobile accessories using the [DummyJSON API](https://dummyjson.com/).
- **Shopping Cart System**: Add, remove, and update quantities of items dynamically via a slide-out cart sidebar.
- **Product Details Modal**: View comprehensive product details and navigate through an image gallery carousel inside a system-styled dialog window.
- **Checkout Sequence**: A simulated terminal logging sequence outputs your receipt dynamically upon checkout.
- **Responsive Design**: Adapts cleanly from desktop down to mobile viewports.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (CSS Variables for theme tokens, Flexbox/Grid for layout)
- **Data Fetching**: Native Fetch API
- **State Management**: React `useState` & `useEffect`

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tyler-TheCoder/Terminal-Shop.git
   cd Terminal-Shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```text
src/
├── components/
│   ├── CartSidebar.jsx / .css      # Slide-out shopping cart
│   ├── CategoryFilter.jsx / .css   # Category selection buttons
│   ├── CheckoutTerminal.jsx / .css # Retro checkout receipt modal
│   ├── Footer.jsx / .css           # Pinned bottom footer
│   ├── Header.jsx / .css           # Top navigation and logo
│   ├── ProductCard.jsx / .css      # Individual product display
│   ├── ProductGrid.jsx / .css      # Grid layout for products
│   ├── ProductModal.jsx / .css     # Detailed view with image gallery
│   └── SearchBar.jsx / .css        # Debounced search input
├── App.jsx                         # Main application state and layout
├── index.css                       # Global styles, variables, reset, and theme
└── main.jsx                        # React entry point
```

## Contact

**Developer**: Akram Bounoua  
**Email**: akram.bounoua.info@gmail.com  
**Repository**: [Terminal-Shop](https://github.com/Tyler-TheCoder/Terminal-Shop.git)
