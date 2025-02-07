import React from "react";

function SearchForm({ q, setQ }) {
  return (
    <div className="search-wrapper">
      <label htmlFor="search-form">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search for..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="sr-only">Search countries here</span>
      </label>
    </div>
  );
}

export default SearchForm;