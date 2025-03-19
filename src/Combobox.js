import React, { useState } from "react";

function Combobox({ q, setQ, options }) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQ(inputValue);

    if (inputValue.length > 0) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (value) => {
    setQ(value);
    setShowDropdown(false);
  };

  return (
    <div className="combobox-container">
      <label htmlFor="search-form">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="combobox-input"
          placeholder="Search for..."
          value={q}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
      </label>

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="dropdown">
          {filteredOptions.map((option, index) => (
            <li key={index} onMouseDown={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Combobox;
