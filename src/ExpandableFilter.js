import React from "react";
import Select from "react-select"; // Import react-select

function ExpandableFilter({ title, options, selectedOption, onSelectOption }) {
  // Handle selection change
  const handleChange = (selectedOption) => {
    onSelectOption(selectedOption ? selectedOption.value : "All");
  };

  return (
    <div className="expandable-filter">
      <div className="filter-header">
        
      </div>

      <div className="filter-options">
        <Select
          options={options}
          value={options.find((option) => option.value === selectedOption)}
          onChange={handleChange}
          placeholder={`Select ${title}`}
          isClearable={true}
        />
      </div>
    </div>
  );
}

export { ExpandableFilter };
