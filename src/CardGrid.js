import React, { useState, useEffect, useRef } from "react";
import LoadingContainer from "./LoadingContainer";

function CardGrid({ currentItems, filteredItems, isCardContentVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  
  const handleNext = () => {
    if (modalItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === modalItem.id);
      if (currentIndex < filteredItems.length - 1) {
        setModalItem(filteredItems[currentIndex + 1]);
      }
    }
  };

  const handlePrevious = () => {
    if (modalItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === modalItem.id);
      if (currentIndex > 0) {
        setModalItem(filteredItems[currentIndex - 1]);
      }
    }
  };



    const useImageLoaded = () => {
      const [loaded, setLoaded] = useState(false);
      const ref = useRef(null);

      useEffect(() => {
        const image = ref.current;
        if (!image) return;
        // checking if already loaded
        if (image.complete && image.naturalHeight !== 0) {
          setLoaded(true);
          return;
        }

        //load event listener
        const handleLoad = () => setLoaded(true);
        image.addEventListener("load", handleLoad);

        //cleanup event listener on unmount
        return () => image.removeEventListener("load", handleLoad);
      }, [ref.current]); // runs when ref.current changes

      return [ref, loaded];
    };

    const ModalImage = ({ src, alt }) => {
      const [ref, loaded] = useImageLoaded();

      return (
        <div>
          {!loaded && 
            <div className="loading-modal-image">
              <LoadingContainer />
            </div>
          
          }  {/* Show a loading state */}
          <img 
            ref={ref} 
            src={src} 
            alt={alt} 
            style={{ display: loaded ? "block" : "none" }} 
          />
        </div>
      );
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
              
              <ModalImage 
              src={item.img} 
              alt={`${item.country} ${item.denomination} ${item.year}`} 
            />

{/* 
              <img 
                src={item.img || "https://lh3.googleusercontent.com/pw/AP1GczPRdJCisYdBa0OwGwJ5UmWVeBi3ZHNUq02HrNGQjpUw9HDyehwb_Q3_3J2cBFgfMv7yUJCH8cuMdxeiguNQ1GcGcF3ZQ04YFCsouCgCAZ83-QvxV_zgWMQnJ2hJGp_egVnp570bT1P8k2Hs6PYNjNpt=w300-h150-s-no-gm?authuser=0"} 
                alt={`${item.country} ${item.denomination} ${item.year}`}
              />

*/} 
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsOpen(false)} className="close-button">&times;</button>
            <button onClick={handlePrevious} className="prev-button">&#12296;</button>
      

            <ModalImage 
              src={modalItem.link} 
              alt={`${modalItem.country} ${modalItem.denomination} ${modalItem.year}`} 
            />

{/* 
                <img 
                  src={modalItem.link} 
                  alt={`${modalItem.country} ${modalItem.denomination} ${modalItem.year}`} 
                  className={`modal-image ${isImageLoaded ? "" : "loading"}`}
                  onLoad={() => setIsImageLoaded(true)}
                /> 
*/}

            <div className="modal-text">
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
