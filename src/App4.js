import React, { useEffect, useState, useCallback } from "react";
import { Filter } from "./Filter"; 
import SearchForm from "./SearchForm";
import CardGrid from "./CardGrid";
import Combobox from "./Combobox";
import "react-widgets/styles.css";
import InfoOverlay from "./ModalInfo";
import LoadingContainer from "./LoadingContainer";
import Pagination from "./Pagination";
import { ExpandableFilter } from "./ExpandableFilter"; 

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["country", "denomination", "country_search"]);
  const [filterParam, setFilterParam] = useState("All");
  const [themeFilter, setThemeFilter] = useState("All");
  const [uniqueThemes, setUniqueThemes] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]); // Store country list
  const [themeCounts, setThemeCounts] = useState({});
  const [regionsCount, setRegionsCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // state for header visibility
  const [isCardContentVisible, setIsCardContentVisible] = useState(true); 
  const [infoOpen, setInfoOpen] = useState(false); // info overlay visibility

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

  useEffect(() => {
    if (items.length > 0) {
      const countrySet = new Set(items.map((item) => item.country.trim())); 
      setUniqueCountries(Array.from(countrySet)); // Convert Set to array
    }
  }, [items]); // Runs when `items` updates
  
 

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

  const filterItems = (items, searchQuery, searchParam, region, theme, country) => {
    return items.filter((item) => {
      const searchMatch = searchParam.some((param) =>
        item[param]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      const regionMatch = region === "All" || item.region === region;
      const themeMatch = theme === "All" || item.theme.split(", ").some((itemTheme) => itemTheme === theme);
      

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

  const onPageChanged = (pageNumber) => {
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

  // Toggle card-content visibility
  const toggleCardContent = () => {
    setIsCardContentVisible((prev) => !prev);
  };

  if (error) {
    return (
      <p>
        {error.message}, if you get this error, the free API I used might have stopped working.
      </p>
    );
  } else if (!isLoaded) {
    return (
      <div style={{ 
        position: "fixed", 
        inset: "0px",
        width: "fit-content",
        height: "fit-content",
        margin: "auto"
      }}>
        <LoadingContainer />
      </div>
      
    );
  } else {
    return (
      <div className="wrapper">
        <button onClick={toggleHeader} className={`header-toggle-btn ${isHeaderVisible ? 'active' : ''}`}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
          <div>
            <button onClick={() => setInfoOpen(true)} className="info-button">
              i
            </button>
            {infoOpen && 
            <InfoOverlay 
            countriesAmount={`${uniqueCountries.length}`} 
            coinsAmount={`${items.length}`}
            onClose={() => setInfoOpen(false)} />}
          </div>
        <div className={`header ${isHeaderVisible ? "show" : ""}`}>
          <SearchForm className="search-input" q={q} setQ={setQ} options={uniqueCountries} />
          
          <ExpandableFilter
            title="Region"
            options={getDynamicRegionOptions()}
            selectedOption={filterParam}
            onSelectOption={setFilterParam}
          />
          <ExpandableFilter
            title="Theme"
            options={getDynamicThemeOptions()}
            selectedOption={themeFilter}
            onSelectOption={setThemeFilter}
          />
          <div className="multiple-buttons">
            <button onClick={resetFilters} className="reset-filters-btn">
              Reset Filters
            </button>
            
            <button onClick={toggleCardContent} className={`toggle-content-btn ${isCardContentVisible ? "" : "active"}`}> 
            {`${isCardContentVisible ? "Hide Info" : "Show Info"}`}
            </button>
            
            
          </div>  
          
        </div>
       
        <div className={`content ${isHeaderVisible ? 'shifted' : ''}`}>
          <CardGrid 
            currentItems={currentItems} 
            filteredItems={filteredItems}
            isCardContentVisible={isCardContentVisible} 
          />
        </div>
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
