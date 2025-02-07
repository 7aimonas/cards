import React from "react";

function CardGrid({ currentItems }) {
  return (
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
  );
}

export default CardGrid;