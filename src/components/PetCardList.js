import React, { useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import PetCard from "./PetCard";
import { animals } from "../db.js";
import "../styles/PetCardList.css";

function PetCardList(props) {
  const baseServerUrl = useContext(ServerContext);
  const petCards = props.pets.map((pet) => {
    return (
      <PetCard
        key={pet._id}
        id={pet._id}
        name={pet.name}
        imageUrl={`${baseServerUrl}/pet_images/${pet.imageFileName}`}
        status={pet.status}
      />
    );
  });

  return (
    <div className="main-section">
      {props.header && <h1>{props.header}</h1>}
      <div className="cards">{petCards}</div>
    </div>
  );
}

export default PetCardList;
