import React from "react";

const modalImageUrl = "https://lh3.googleusercontent.com/pw/AP1GczOzALdd-8GuXdsUC4uzx6RVxMaHI92M0GPGljZ31pTCmRjOED1_sE06K1si4_nspyIlPzpUX0xw84tm5YyO_Xo87xckwFVbyL4pfT34zZu0n0jKOCebf-1rYkzKL4IMJW2i9GYABl1sF4mbmp6kGWne=w1773-h889-s-no-gm?authuser=0";
const modalImageUrl2 = "https://photos.google.com/share/AF1QipNxwgDTKXzsdBepAM7VrJJBTaxdEFMvkktGLL17BikL86h7PayRu5_TPENRMilByQ/photo/AF1QipOyjIiY6yATq1xesXdVEDbnwkdFlFzScILUZCNK?key=SXZnQ2xzU05rQUNDd0Vza1Njd0xEY0pGYndGV0Nn";
function InfoOverlay({ onClose, countriesAmount, coinsAmount }) {
    return (
      <div className="overlay">
        <div className="info-container">
          <h2 className="info-title">Information</h2>
          
          <div className="info-content">
            
            This gallery is automatically populated with data fetched from a Google Sheets table. 
            Currently it consists of <b>{`${coinsAmount}`}</b> coins from <b>{`${countriesAmount}`}</b> countries and territories. 
            
          </div>
         
          <br></br>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  export default InfoOverlay;
  