import React, { useEffect, useState, useCallback } from "react";
import { Filter } from "./Filter"; // Only import Filter component now
import SearchForm from "./SearchForm";
import CardGrid from "./CardGrid";
import Pagination from "./Pagination";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState(""); // Search query
  const [searchParam] = useState(["country", "denomination", "region"]); // Search parameters
  const [filterParam, setFilterParam] = useState("All"); // Region filter
  const [themeFilter, setThemeFilter] = useState("All"); // Theme filter
  const [uniqueThemes, setUniqueThemes] = useState([]);
  const [themeCounts, setThemeCounts] = useState({});
  const [regionsCount, setRegionsCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);

          // Extract unique themes and calculate the count for each theme
          const themes = new Set();
          const counts = {};
          const regions = {}; // Using an object to store region counts

          result.forEach((item) => {
            item.theme.split(", ").forEach((tag) => {
              const trimmedTag = tag.trim();
              themes.add(trimmedTag);

              if (!counts[trimmedTag]) {
                counts[trimmedTag] = 0;
              }
              counts[trimmedTag]++;
            });

            // Count items by region
            if (regions[item.region]) {
              regions[item.region]++;
            } else {
              regions[item.region] = 1;
            }
          });

          setUniqueThemes(Array.from(themes));
          setThemeCounts(counts);

          // Convert the regions object into an array of objects and sort by region name
          const regionCountsArray = Object.entries(regions)
            .map(([region, count]) => ({ region, count }))
            .sort((a, b) => a.region.localeCompare(b.region)); // Alphabetically sort regions

          setRegionsCount(regionCountsArray); // Set the regions count
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(items);

  // Filter function moved here in App.js
  const filterItems = (items, searchQuery, searchParam, region, theme) => {
    return items.filter((item) => {
      const searchMatch = searchParam.some((param) =>
        item[param].toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      const regionMatch = region === "All" || item.region === region;

      const themeMatch =
        theme === "All" ||
        item.theme.split(", ").some((itemTheme) => itemTheme === theme);

      return searchMatch && regionMatch && themeMatch;
    });
  };

  // Reset to page 1 when filter, themeFilter, or search query changes
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    resetPage(); // Reset page when q, filterParam, or themeFilter changes
  }, [q, filterParam, themeFilter, resetPage]);

  // Use filterItems function here to filter data
  const filteredItems = filterItems(data, q, searchParam, filterParam, themeFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to reset filters
  const resetFilters = () => {
    setQ(""); // Reset search query
    setFilterParam("All"); // Reset region filter
    setThemeFilter("All"); // Reset theme filter
    setCurrentPage(1); // Reset pagination to first page
  };

  if (error) {
    return (
      <p>
        {error.message}, if you get this error, the free API I used might have stopped working, but I created a simple example that demonstrates how this works,{" "}
        <a href="https://codepen.io/Spruce_khalifa/pen/mdXEVKq">check it out</a>
      </p>
    );
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="wrapper">
        <SearchForm q={q} setQ={setQ} />
        <Filter
          setFilterParam={setFilterParam}
          setThemeFilter={setThemeFilter}
          uniqueThemes={uniqueThemes}
          themeCounts={themeCounts}
          regionsCount={regionsCount}
          filterParam={filterParam} // Pass the filterParam as a prop
          themeFilter={themeFilter} // Pass the themeFilter as a prop
        />
        {/* Reset Filters Button */}
        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
        <CardGrid currentItems={currentItems} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    );
  }
}

export default App;
