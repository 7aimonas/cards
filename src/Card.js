function Card({ country, region, denomination, year, image, link }) {
    return (
      <div className="card">
        <div className="card-image" onClick={() => { window.open(link, "_blank") } }>
            <img
                src={image}
                alt={country}
            />
        </div>
        <h1>{country}</h1>
        <p>{region} {denomination} {year}</p>
        
      </div>
    );
  }
  
  export default Card;