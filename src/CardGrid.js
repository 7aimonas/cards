import React from "react";

function CardGrid({ currentItems, isCardContentVisible }) {
  return (
    <ul className="card-grid">
      {currentItems.map((item) => (
        <div className="card" key={item.id}>
            <div
              className="card-image"
              onClick={() => {
                const openLink = (url) => {
                  const link = document.createElement("a");
                  link.href = url;
                  link.target = "_blank";
                  link.rel = "noopener noreferrer";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                };

                openLink(item.link);
              }}
            >
            <img 
            src={item.img || "https://lh3.googleusercontent.com/pw/AP1GczPRdJCisYdBa0OwGwJ5UmWVeBi3ZHNUq02HrNGQjpUw9HDyehwb_Q3_3J2cBFgfMv7yUJCH8cuMdxeiguNQ1GcGcF3ZQ04YFCsouCgCAZ83-QvxV_zgWMQnJ2hJGp_egVnp570bT1P8k2Hs6PYNjNpt=w300-h150-s-no-gm?authuser=0"} 
            alt={`${item.country} ${item.denomination} ${item.year}`}
            />
          </div>

          
          <div className={`card-content ${isCardContentVisible ? "" : "hide"}`}>
            <h2 className="card-name">{item.country}</h2>
            <ol className="card-list">
              <li>
                Denomination: <span>{item.denomination}</span>
              </li>
              <li>
                Region: <span>{item.region}</span>
              </li>
              <li>
                Year: <span>{item.year}</span>
              </li>
              <li>
                Weight:
                {item.weight && item.weight.length > 0 ? <span> {item.weight}g</span> : <span> n/a</span>}
              </li>
              <li>
                Mintage: 
                {item.mintage && item.mintage.length > 0 ? <span> {item.mintage}</span> : <span> Unknown</span>}
              </li>
              <li>
                Mint: 
                {item.mint && item.mint.length > 0 ? <span> {item.mint}</span> : <span> Unknown</span>}
              </li>
              <li>
                Theme: 
                {item.theme && item.theme.length > 0 ? <span> {item.subject}</span> : <span> n/a</span>}
              </li>
            </ol>
          </div>
         
        </div>
      ))}
    </ul>
  );
}

export default CardGrid;