import React from 'react';

const FilterProducts = ({
  selectedCategory,
  onCategoryChange,
  sortproducts,
  onSortChange,
  categories
}) => {
  return (
    <div className="filter-section">
      <div className="filter-group">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={sortproducts}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}

export default FilterProducts;
