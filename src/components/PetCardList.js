import React from "react";
import PetCard from "./PetCard";
import { animals } from "../db.js";
import "../styles/PetCardList.css";

function PetCardList(props) {
  const petCards = props.petIds.map((id) => {
    let animal = animals.find((animal) => animal.animalId === id);
    console.log(animal);
    return (
      <PetCard
        key={id}
        id={id}
        name={animal.name}
        imageUrl={animal.imageUrl}
        status={animal.status}
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
