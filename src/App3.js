import React, { useEffect, useState } from 'react';
import Card from './Card';
import './App.css'; // Make sure to create some basic styles for the cards in App.css

function App() {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["country", "region", "country_search"]);
  const [filterParam, setFilterParam] = useState(["All"]);




  useEffect(() => {  
    fetch("https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1") 
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(error => console.error('Error fetching data:', error));
   
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



if (error) {
    return (
        <p>
            {error.message}, if you get this error, the free API I used
            might have stopped working, but I created a simple example that
            demonstrate how this works,{" "}
            <a href="https://codepen.io/Spruce_khalifa/pen/mdXEVKq">
                {" "}
                check it out{" "}
            </a>{" "}
        </p>
    );
} 


    else {
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
                </div>
            
                <h1>World crowns</h1>
                
                <div className="card-grid">
                    {items.map((item, index) => (
                        
                    <Card key={index} region= {item.region} country={item.country} denomination={item.denomination} year={item.year} image={item.img} link={item.link}  />
                    ))}
                </div>



                
            </div>
        );
    }



}

export default App;



