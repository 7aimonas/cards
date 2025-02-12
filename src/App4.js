import React, { useEffect, useState, useCallback } from "react";
import { Filter } from "./Filter"; 
import SearchForm from "./SearchForm";
import CardGrid from "./CardGrid";
import Pagination from "./Pagination";
import { ExpandableFilter } from "./ExpandableFilter"; 

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["country", "denomination", "region"]);
  const [filterParam, setFilterParam] = useState("All");
  const [themeFilter, setThemeFilter] = useState("All");
  const [uniqueThemes, setUniqueThemes] = useState([]);
  const [themeCounts, setThemeCounts] = useState({});
  const [regionsCount, setRegionsCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // state for header visibility

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          recalculateCounts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const recalculateCounts = (items) => {
    const themes = new Set();
    const counts = {};
    const regions = {};

    items.forEach((item) => {
      item.theme.split(", ").forEach((tag) => {
        const trimmedTag = tag.trim();
        themes.add(trimmedTag);

        if (!counts[trimmedTag]) {
          counts[trimmedTag] = 0;
        }
        counts[trimmedTag]++;
      });

      if (regions[item.region]) {
        regions[item.region]++;
      } else {
        regions[item.region] = 1;
      }
    });

    setUniqueThemes(Array.from(themes));
    setThemeCounts(counts);

    const regionCountsArray = Object.entries(regions)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => a.region.localeCompare(b.region));

    setRegionsCount(regionCountsArray);
  };

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

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    resetPage();
  }, [q, filterParam, themeFilter, resetPage]);

  const filteredItems = filterItems(items, q, searchParam, filterParam, themeFilter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const resetFilters = () => {
    setQ("");
    setFilterParam("All");
    setThemeFilter("All");
    setCurrentPage(1);
  };

  const getRegionCount = (region) => {
    return filteredItems.filter((item) => item.region === region).length;
  };

  const getThemeCount = (theme) => {
    return filteredItems.filter((item) => item.theme.split(", ").includes(theme)).length;
  };

  const getDynamicRegionOptions = () => {
    return regionsCount
      .filter((regionObj) => getRegionCount(regionObj.region) > 0)
      .map((regionObj) => ({
        value: regionObj.region,
        label: `${regionObj.region} (${getRegionCount(regionObj.region)})`,
      }));
  };

  const getDynamicThemeOptions = () => {
    const themeOptions = uniqueThemes
      .filter((theme) => getThemeCount(theme) > 0)
      .map((theme) => ({
        value: theme,
        label: `${theme} (${getThemeCount(theme)})`,
      }));

    themeOptions.sort((a, b) => {
      const countA = parseInt(a.label.split('(')[1].split(')')[0]);
      const countB = parseInt(b.label.split('(')[1].split(')')[0]);
      return countB - countA;
    });

    return themeOptions;
  };

  // Toggle Header visibility
  const toggleHeader = () => {
    setIsHeaderVisible((prev) => !prev);
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
        <div className="search-wrapper">
        <button onClick={toggleHeader} className={`header-toggle-btn ${isHeaderVisible ? 'active' : ''}`}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className={`header ${isHeaderVisible ? "show" : ""}`}>
          <SearchForm q={q} setQ={setQ} />
          <ExpandableFilter
            title="Filter by Region"
            options={getDynamicRegionOptions()}
            selectedOption={filterParam}
            onSelectOption={setFilterParam}
          />
          <ExpandableFilter
            title="Filter by Theme"
            options={getDynamicThemeOptions()}
            selectedOption={themeFilter}
            onSelectOption={setThemeFilter}
          />
          <button onClick={resetFilters} className="reset-filters-btn">
            Reset Filters
          </button>
        </div>
        </div>
        <div className={`content ${isHeaderVisible ? 'shifted' : ''}`}>
          <CardGrid currentItems={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
