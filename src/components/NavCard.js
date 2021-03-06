import React from "react";
import "../styles/NavCard.css";
import userListIcon from "../user_list.jpg";
import animalListIcon from "../animal_list.jpg";
import myPetsIcon from "../my_pets.jpg";
import savedPetsIcon from "../saved_pets.jpg";
import myProfileIcon from "../my_profile.jpg";

function NavCard(props) {
  let icon;
  let text = "";
  switch (props.type) {
    case "userList":
      icon = userListIcon;
      text = "MANAGE USERS";
      break;
    case "animalList":
      icon = animalListIcon;
      text = "MANAGE ANIMALS";
      break;
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
      <div className="img-container nav-icon-container">
        <img className="icon" src={icon} alt="my pets icon" />
      </div>
      <h1 className="card-text">{text}</h1>
    </div>
  );
}

export default NavCard;
