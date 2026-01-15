import React from 'react';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
