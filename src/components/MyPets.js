import axios from "axios";
import React, { useState, useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import PetCardList from "./PetCardList";

function MyPets(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [petList, setPetList] = useState([]);
  const getOwnedPets = () => {
    axios.get(baseServerUrl + `/currentuser`, authConfig).then((res) => {
      axios
        .get(baseServerUrl + `/pet/user/${res.data._id}`, authConfig)
        .then((res) => {
          setPetList(res.data);
        });
    });
  };

  const getSavedPets = () => {
    axios.get(baseServerUrl + `/currentuser`, authConfig).then((res) => {
      axios
        .get(baseServerUrl + `/saved/user/${res.data._id}`, authConfig)
        .then((res) => {
          setPetList(res.data);
        });
    });
  };
  if (props.savedOrOwned === "owned") {
    // put spinner
    getOwnedPets();
    // end spinner
  } else if (props.savedOrOwned === "saved") {
    // put spinner
    getSavedPets();
    // end spinner
  }
  return (
    <div className="main-container">
      <h1>My Pets</h1>
      <PetCardList pets={petList} />
    </div>
  );
}

export default MyPets;
