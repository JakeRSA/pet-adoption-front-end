import React from "react";
import "../styles/Spinner.css";

function Spinner() {
  return (
    <div className="loader-wrapper d-flex justify-content-center align-items-center">
      <div className="loader">
        <div className="line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
