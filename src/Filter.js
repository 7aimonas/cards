import React, { createContext, useContext, useState } from 'react';

// Sample Data
const products = [
  { id: 1, name: 'Red Shirt', color: 'red', size: 'M', brand: 'Nike' },
  { id: 2, name: 'Blue Shirt', color: 'blue', size: 'L', brand: 'Adidas' },
  { id: 3, name: 'Green Shirt', color: 'green', size: 'S', brand: 'Nike' },
  // Add more products as needed
];

// Context for Filters
const FilterContext = createContext();

// FilterProvider to manage filter state
const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    brand: [],
  });

  const toggleFilter = (category, value) => {
    setFilters((prevFilters) => {
      const categoryFilters = prevFilters[category];
      return {
        ...prevFilters,
        [category]: categoryFilters.includes(value)
          ? categoryFilters.filter((item) => item !== value)
          : [...categoryFilters, value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      color: [],
      size: [],
      brand: [],
    });
  };

  return (
    <FilterContext.Provider value={{ filters, toggleFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use filter context
const useFilters = () => useContext(FilterContext);

// Filter component for individual category
const Filter = ({ category, options }) => {
  const { filters, toggleFilter } = useFilters();

  return (
    <div>
      <h4>{category}</h4>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={filters[category].includes(option)}
            onChange={() => toggleFilter(category, option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// ProductList to display filtered products
const ProductList = () => {
  const { filters } = useFilters();

  const filteredProducts = products.filter((product) => {
    return (
      (filters.color.length === 0 || filters.color.includes(product.color)) &&
      (filters.size.length === 0 || filters.size.includes(product.size)) &&
      (filters.brand.length === 0 || filters.brand.includes(product.brand))
    );
  });

  return (
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id}>
            <h5>{product.name}</h5>
            <p>Color: {product.color}, Size: {product.size}, Brand: {product.brand}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

// Main component
const App = () => {
  return (
    <FilterProvider>
      <h1>Product Filters</h1>
      <div>
        <Filter category="color" options={['red', 'blue', 'green']} />
        <Filter category="size" options={['S', 'M', 'L', 'H']} />
        <Filter category="brand" options={['Nike', 'Adidas']} />
      </div>
      <ProductList />
    </FilterProvider>
  );
};

export default App;