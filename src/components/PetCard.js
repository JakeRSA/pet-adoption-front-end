import React from "react";
import { Switch, Link } from "react-router-dom";
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
      <Switch>
        <Link className="visited" to={`/pet/${props.id}`}>
          <button className="submit">go to details</button>
        </Link>
      </Switch>
    </div>
  );
}

export default PetCard;
