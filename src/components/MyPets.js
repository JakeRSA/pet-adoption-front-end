import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import PetCardList from "./PetCardList";

function MyPets(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOwnedPets = () => {
    return axios.get(baseServerUrl + `/currentuser`, authConfig).then((res) => {
      axios
        .get(baseServerUrl + `/pet/user/${res.data._id}`, authConfig)
        .then((res) => {
          setPetList(res.data);
        });
    });
  };
  const getSavedPets = () => {
    return axios.get(baseServerUrl + `/currentuser`, authConfig).then((res) => {
      axios
        .get(baseServerUrl + `/saved/user/${res.data._id}`, authConfig)
        .then((res) => {
          setPetList(res.data);
        });
    });
  };

  let getPets;
  if (props.savedOrOwned === "owned") {
    getPets = getOwnedPets;
  } else if (props.savedOrOwned === "saved") {
    getPets = getSavedPets;
  }

  useEffect(() => {
    let mounted = true;
    getPets().then(() => {
      if (mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="main-container">
      <h1>{props.savedOrOwned === "owned" ? "My Pets" : "Saved Pets"}</h1>
      <PetCardList pets={petList} />
    </div>
  );
}

export default MyPets;
