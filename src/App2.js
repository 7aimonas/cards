import React, { useEffect, useState } from 'react';
import Card from './Card';
import './App.css'; // Make sure to create some basic styles for the cards in App.css

function App() {
  const [items, setItems] = useState([]);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["capital", "name", "numericCode"]);
  const [filterParam, setFilterParam] = useState(["All"]);




  useEffect(() => {  
    fetch("https://opensheet.elk.sh/1KNnklCHoG9oiLH6Zu44imt846-VZ6deJw4asdRmbRmg/1") // Replace with your actual endpoint URL
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(error => console.error('Error fetching data:', error));
   
  }, []);


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


  return (
    <div className="App">
      <h1>World crowns</h1>

        




      
      <div className="card-grid">
        {items.map((item, index) => (
            
          <Card key={index} country={item.Country} denomination={item.Denomination} year={item.Year} image={item.Img} link={item.Link}  />
        ))}
      </div>
    </div>
  );
}

export default App;



