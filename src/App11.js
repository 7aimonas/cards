import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["country", "denomination", "region"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24); // Number of items per page

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1"
    )
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

  const data = Object.values(items);
  console.log(data);

  function search(items) {
    return items.filter((item) => {
      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  // Pagination logic
  const filteredItems = search(data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return (
      <p>
        {error.message}, if you get this error, the free API I used might have
        stopped working, but I created a simple example that demonstrates how
        this works,{" "}
        <a href="https://codepen.io/Spruce_khalifa/pen/mdXEVKq">check it out</a>
      </p>
    );
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="wrapper">
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

          <div className="select">
            <select
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              className="custom-select"
              aria-label="Filter Countries By Region"
              id="region-select"
            >
              <option value="All">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Middle East">Middle East</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <span className="focus"></span>
          </div>

          <div className="select">
            <select
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              className="custom-select"
              aria-label="Filter by theme"
              id="theme-select"
            >
              <option value="All">Filter By Theme</option>
              <option value="Oversized">Oversized</option>
              <option value="Non-Circulating">Non-Circulating</option>
              <option value="Animals">Animals</option>
              <option value="Rare">Rare</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>

        <ul className="card-grid">
          {currentItems.map((item) => (
            <div className="card" key={item.id}>
              
              <div
                className="card-image"
                onClick={() => {
                  window.open(item.link, "_blank");
                }}
              >
                <img src={item.img} alt={item.country} />
              </div>
              <div className="card-content">
                <h2 className="card-name">{item.country}</h2>
                <ol className="card-list">
                  <li>
                    Denomination: <span>{item.denomination}</span>
                  </li>
                  <li>
                    Region: <span>{item.region}</span>
                  </li>
                  <li>
                    Date: <span>{item.year}</span>
                  </li>
                  <li>
                    Theme: <span>{item.theme}</span>
                  </li>
                  <li>
                 
                  {item.theme.split(", ").map((tags) => (
                    <span key={tags}>#{tags} </span>
                  ))}
              
                  </li>
                </ol>
              </div>
            </div>
          ))}
        </ul>

        {/* Pagination controls */}
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
