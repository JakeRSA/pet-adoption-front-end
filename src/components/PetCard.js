import React from "react";
import samplePetImg from "../my_pets.jpg";
import "../styles/PetCard.css";

function PetCard(props) {
  let status;
  if (props.status === "foster") {
    status = "in a foster home";
  } else if (props.status === "has owner") {
    status = "has a forever home";
  } else {
    status = "looking for a home";
  }

  return (
    <div className="card">
      <div className="img-container">
        <img src={props.imageUrl} alt={props.name}></img>
      </div>
      <div className="basic-info-container">
        <h2>{props.name}</h2>
        <p>{status}</p>
      </div>
      <button className="submit">go to details</button>
    </div>
  );
}

export default PetCard;
