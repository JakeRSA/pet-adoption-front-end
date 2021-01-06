import React from "react";
import { Link } from "react-router-dom";
import "../styles/PetCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function PetCard(props) {
  let status;
  if (props.status === "foster") {
    status = "in a foster home";
  } else if (props.status === "has owner") {
    status = "has a forever home";
  } else {
    status = "looking for a home";
  }

  const petCard = (
    <div className="card">
      <div className="img-container">
        <img src={props.imageUrl} alt={props.name}></img>
      </div>
      <div className="basic-info-container">
        <h2 className="pet-name">{props.name}</h2>
        <p>{status}</p>
      </div>
      <Link className="visited" to={`/pet/${props.id}`}>
        <button className="submit">go to details</button>
      </Link>
    </div>
  );

  const newCard = (
    <div className="card add-new-pet-card">
      <Link className="flex-link" to="/add-pet">
        <div className="inner-border">
          <FontAwesomeIcon className="big-plus" icon={faPlusCircle} />
          <h3>add new pet</h3>
        </div>
      </Link>
    </div>
  );

  return <>{props.new ? newCard : petCard}</>;
}

export default PetCard;
