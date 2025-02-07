import React, { useEffect, useState } from "react";
import { Filter } from "./Filter";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState(""); // Search query state
  const [filterParam, setFilterParam] = useState("All"); // Region filter state
  const [themeFilter, setThemeFilter] = useState("All"); // Theme filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24); // Number of items per page

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(items); // Convert the data to an array for easier manipulation

  // Create a unique list of themes and regions
  const uniqueThemes = [...new Set(data.flatMap((item) => item.theme.split(", ")))];
  const themeCounts = uniqueThemes.reduce((acc, theme) => {
    acc[theme] = data.filter((item) => item.theme.split(", ").includes(theme)).length;
    return acc;
  }, {});

  const regions = [...new Set(data.map((item) => item.region))];
  const regionsCount = regions.map((region) => ({
    region,
    count: data.filter((item) => item.region === region).length,
  }));

  // Filter function to handle both region and theme filtering
  const filterItems = (items) => {
    return items.filter((item) => {
      // Filter by region
      const matchesRegion =
        filterParam === "All" || item.region === filterParam;

      // Filter by theme
      const matchesTheme =
        themeFilter === "All" ||
        item.theme.split(", ").includes(themeFilter);

      return matchesRegion && matchesTheme;
    });
  };

  // Search function to filter by query string
  const searchItems = (items) => {
    return items.filter((item) => {
      return (
        ["country", "denomination", "region"].some((param) =>
          item[param].toString().toLowerCase().includes(q.toLowerCase())
        )
      );
    });
  };

  // Pagination logic
  const filteredItems = filterItems(searchItems(data));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset filters function
  const resetFilters = () => {
    setQ(""); // Clear search input
    setFilterParam("All"); // Reset region filter
    setThemeFilter("All"); // Reset theme filter
    setCurrentPage(1); // Reset pagination to page 1
  };

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <>Loading...</>;
  } else {
    return (
      <div className="wrapper">
        {/* Filter and Search */}
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              id="search-form"
              placeholder="Search for..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>

          {/* Filters */}
          <Filter
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            themeFilter={themeFilter}
            setThemeFilter={setThemeFilter}
            uniqueThemes={uniqueThemes}
            themeCounts={themeCounts}
            regionsCount={regionsCount}
          />

          {/* Reset Filters Button */}
          <button onClick={resetFilters} className="reset-filters-btn">
            Reset Filters
          </button>
        </div>

        {/* Card Grid */}
        <ul className="card-grid">
          {currentItems.map((item) => (
            <li key={item.id} className="card">
              <div
                className="card-image"
                onClick={() => window.open(item.link, "_blank")}
              >
                <img src={item.img} alt={item.country} />
              </div>
              <div className="card-content">
                <h2 className="card-name">{item.country}</h2>
                <ol className="card-list">
                  <li>Denomination: {item.denomination}</li>
                  <li>Region: {item.region}</li>
                  <li>Date: {item.year}</li>
                  <li>Theme: {item.theme}</li>
                </ol>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={number + 1 === currentPage ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
