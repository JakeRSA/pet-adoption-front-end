import React from "react";
import samplePetImg from "../my_pets.jpg";
import "../styles/PetCard.css";

function PetCard(props) {
  let adoptionStatus;
  if (props.adoptionStatus === "foster") {
    adoptionStatus = "in a foster home";
  } else if (props.adoptionStatus === "has owner") {
    adoptionStatus = "has a forever home";
  } else {
    adoptionStatus = "looking for a home";
  }

  return (
    <div className="card">
      <div className="img-container">
        <img src={props.imageUrl} alt={props.name}></img>
      </div>
      <div className="basic-info-container">
        <h2>{props.name}</h2>
        <p>{adoptionStatus}</p>
      </div>
      <button className="submit">go to details</button>
    </div>
  );
}

export default PetCard;
