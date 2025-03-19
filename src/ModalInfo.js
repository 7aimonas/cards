import React from "react";

const modalImageUrl = "https://lh3.googleusercontent.com/pw/AP1GczOzALdd-8GuXdsUC4uzx6RVxMaHI92M0GPGljZ31pTCmRjOED1_sE06K1si4_nspyIlPzpUX0xw84tm5YyO_Xo87xckwFVbyL4pfT34zZu0n0jKOCebf-1rYkzKL4IMJW2i9GYABl1sF4mbmp6kGWne=w1773-h889-s-no-gm?authuser=0";
function InfoOverlay({ onClose, countriesAmount, coinsAmount }) {
    return (
      <div className="overlay">
        <div className="info-container">
          <h2 className="info-title">Information</h2>
          
          <div className="info-content">
            
            This gallery is automatically populated with data fetched from a Google Sheets table. 
            Currently it consists of <b>{`${coinsAmount}`}</b> coins from <b>{`${countriesAmount}`}</b> countries and territories. 
            
          </div>
          <img src={modalImageUrl} alt="Full Image" className="modal-image" />
          <br></br> test image load
          <br></br>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  export default InfoOverlay;
  