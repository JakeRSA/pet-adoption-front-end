import React, { useContext, useEffect, useState } from "react";
import ServerContext from "../contexts/ServerContext";
import axios from "axios";
import PetCardList from "./PetCardList";

function AllPets() {
  const baseServerUrl = useContext(ServerContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPets = async () => {
    const res = await axios.get(baseServerUrl + "/pet");
    setPets(res.data);
    setLoading(false);
  };
  useEffect(() => {
    let mounted = true;
    getPets();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="main-container">
      <h1>Manage Pets</h1>
      {loading || <PetCardList addNew={true} pets={pets} />}
    </div>
  );
}

export default AllPets;
