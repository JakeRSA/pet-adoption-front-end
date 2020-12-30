import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/PetPage.css";
import tempImg from "../my_pets.jpg";

function PetPage(props) {
  const animal = {
    animalId: 1,
    name: "Spot",
    type: "dog",
    breed: "French bulldog",
    birthdate: "2016-05-01",
    weight: 12,
    height: 60,
    status: "foster",
    imageUrl: "../my_profile.jpg",
    carerId: 1,
    color: "brown",
    hypoallergenic: true,
    diet: "vegan, gluten-free, no tree nuts, organic produce only",
    bio:
      "Spot is a good boy and likes to have his tummy rubbed. He also doe snot like to spend time with mixed breed dogs",
  };

  const getAgeString = () => {
    const dateNow = new Date();
    const timeDiff = dateNow - new Date(animal.birthdate);
    const months = Math.ceil((timeDiff * 12) / (1000 * 60 * 60 * 24 * 365));
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (years < 1) {
      return `${months} months`;
    } else return `${years} years and ${remMonths} months`;
  };

  return (
    <div className="main-container">
      <span className="back-btn">
        <FontAwesomeIcon icon={faAngleLeft} />
        <p>back</p>
      </span>
      <div className="main-details-container">
        <div className="animal-summary-container">
          <div className="img-container">
            <img src={tempImg} alt={animal.name}></img>
          </div>
          <div className="animal-basic-container">
            <span className="pet-details-header">
              <h1>{`${animal.name} the ${
                animal.type.slice(0, 1).toUpperCase() +
                animal.type.slice(1, animal.type.length)
              }`}</h1>
              {animal.status === "has owner" || (
                <button className="adopt-btn">adopt or foster now</button>
              )}
            </span>
            <span className="basic-info-row">
              <h4>breed:</h4>
              <p>{animal.breed}</p>
            </span>
            <span className="basic-info-row">
              <h4>age:</h4>
              <p>{getAgeString()}</p>
            </span>
            <span className="basic-info-row bio">
              <p>{animal.bio}</p>
            </span>
          </div>
        </div>
        <div className="more-details-container">
          <span className="detail-row">
            <h4>height:</h4>
            <p>{animal.height + "cm"}</p>
          </span>
          <span className="detail-row">
            <h4>weight:</h4>
            <p>{animal.weight + "kg"}</p>
          </span>
          <span className="detail-row">
            <h4>color:</h4>
            <p>{animal.color}</p>
          </span>
          <span className="detail-row">
            <h4>hypoallergenic:</h4>
            <p>{animal.hypoallergenic ? "yes" : "no"}</p>
          </span>
          <span className="detail-row">
            <h4>dietary restrictions:</h4>
            <p>{animal.diet}</p>
          </span>
        </div>
        <button className="bookmark-btn">add to saved list</button>
      </div>
    </div>
  );
}

export default PetPage;
