import React from "react";
import Select from "react-select"; // Import react-select

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--bg-offset)",
    border: "1px solid var(--border)",
    height: "100%",
    maxHeight: "7ch",
    boxShadow: state.isFocused || state.isHovered ? "none" : "0px 4px 6px var(--border)",  // Shadow disappears on hover
    padding: "0.6em 1em",
    transition: "all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)",
    "&:hover": {
      boxShadow: "none",  // Ensures the shadow is gone on hover
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "transparent",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "0px 4px 6px var(--border)",
    border: "1px solid var(--border)",
    
  }),
};


function ExpandableFilter({ title, options, selectedOption, onSelectOption }) {
  const handleChange = (selectedOption) => {
    onSelectOption(selectedOption ? selectedOption.value : "All");
  };

  return (
    <div className="react-select">
      <Select
        options={options}
        value={options.find((option) => option.value === selectedOption) || null}
        onChange={handleChange}
        placeholder={`${title}`}
        isClearable={true}
        styles={customStyles} // Apply the custom styles
      />
    </div>
  );
}

export { ExpandableFilter };
