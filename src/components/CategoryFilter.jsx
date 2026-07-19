import './CategoryFilter.css';

const CATEGORIES = [
  { key: 'all', label: 'ALL' },
  { key: 'laptops', label: 'LAPTOPS' },
  { key: 'accessories', label: 'ACCESSORIES' },
];

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <span className="category-filter-prompt">$ ls --filter</span>
      <div className="category-filter-options">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            id={`filter-${cat.key}`}
            className={`category-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.key)}
          >
            [{cat.label}]
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
