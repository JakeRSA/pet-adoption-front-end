import React from "react";
import "../styles/NavCard.css";
import myPetsIcon from "../my_pets.jpg";
import savedPetsIcon from "../saved_pets.jpg";
import myProfileIcon from "../my_profile.jpg";

function NavCard(props) {
  let icon;
  let text = "";
  switch (props.type) {
    case "myPets":
      icon = myPetsIcon;
      text = "MY PETS";
      break;
    case "savedPets":
      icon = savedPetsIcon;
      text = "SAVED PETS";
      break;
    case "myProfile":
      icon = myProfileIcon;
      text = "PROFILE";
      break;
    default:
      icon = null;
  }
  return (
    <div className="nav-card">
      <div className="icon-container">
        <img className="icon" src={icon} alt="my pets icon" />
      </div>
      <h1 className="card-text">{text}</h1>
    </div>
  );
}

export default NavCard;
