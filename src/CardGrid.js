import React, { useState, useEffect } from "react";
import LoadingContainer from "./LoadingContainer";

function CardGrid({ currentItems, filteredItems, isCardContentVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleNext = () => {
    if (modalItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === modalItem.id);
      if (currentIndex < filteredItems.length - 1) {
        setModalItem(filteredItems[currentIndex + 1]);
        setIsImageLoaded(false);
        
      }
    }
  };

  const handlePrevious = () => {
    if (modalItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === modalItem.id);
      if (currentIndex > 0) {
        setModalItem(filteredItems[currentIndex - 1]);
        setIsImageLoaded(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        if (event.key === "ArrowRight") {
          handleNext();
        } else if (event.key === "ArrowLeft") {
          handlePrevious();
        } else if (event.key === "Escape") {
          setIsOpen(false);
        }
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, modalItem]);

  return (
    <>
      <ul className="card-grid">
        {currentItems.map((item) => (
          <div className={`card ${isCardContentVisible ? "" : "hide"}`} key={item.id}>
            <div
              className="card-image"
              onClick={() => {
                setModalItem(item);
                setIsOpen(true);
                
                
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

      {isOpen && modalItem && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className={`modal-content ${isImageLoaded ? "" : "loading"}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="close-button">&times;</button>
            <button onClick={handlePrevious} className="prev-button">&#12296;</button>
           
        
                
            {!isImageLoaded ? 

                <img 
                  onLoad={() => setIsImageLoaded(true)}
                  src={modalItem.link} 
                  alt={`${modalItem.country} ${modalItem.denomination} ${modalItem.year}`} 
                  className={`modal-image ${isImageLoaded ? "" : "loading"}`}
                /> 
              :
                (
                
                <div>Loading</div>
                )
            }

            <div className={`modal-text ${isImageLoaded ? "" : "loading"}`}>
              <b>{`${modalItem.country}`}</b>
            <br />
            {`${modalItem.denomination} ${modalItem.year}`}
            </div>
            <button onClick={handleNext} className="next-button">&#12297;</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CardGrid;
