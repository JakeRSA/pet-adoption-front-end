import React, { useEffect, useState, useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import "../styles/PetPage.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";

function PetPage(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [loadingAdopt, setLoadingAdopt] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [animal, setAnimal] = useState({});
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    axios.get(baseServerUrl + `/pet/${id}`).then((animal) => {
      setAnimal(animal.data);
      axios.get(baseServerUrl + "/currentuser", authConfig).then((user) => {
        setUser(user.data);
        setLoading(false);
      });
      if (mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

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

  const handleAdopt = () => {
    setLoadingAdopt(true);
    axios
      .put(baseServerUrl + `/pet/${id}/adopt`, { type: "adopt" }, authConfig)
      .then((res) => {
        setLoadingAdopt(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFoster = () => {
    setLoadingAdopt(true);
    axios
      .put(baseServerUrl + `/pet/${id}/adopt`, { type: "foster" }, authConfig)
      .then(() => {
        setLoadingAdopt(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReturnPet = () => {
    setLoadingAdopt(true);
    axios
      .put(baseServerUrl + `/pet/${id}/return`, {}, authConfig)
      .then(() => {
        setLoadingAdopt(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSavePet = () => {
    setLoadingSaved(true);
    axios
      .put(baseServerUrl + `/pet/${id}/save`, {}, authConfig)
      .then(() => {
        setLoadingSaved(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemovePet = () => {
    setLoadingSaved(true);
    axios
      .delete(baseServerUrl + `/pet/${id}/save`, authConfig)
      .then(() => {
        setLoadingSaved(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* determine what actions the user can take based on their user type and relationship to the pet */
  let userActionBtn;
  if (!loading) {
    if (user.type === "admin") {
      userActionBtn = (
        <Link to={`/edit-pet/${animal._id}`}>
          <button className="adopt-btn">edit details</button>
        </Link>
      );
    } else {
      if (user._id === animal.carerId) {
        userActionBtn = (
          <button
            className="adopt-btn"
            onClick={() => {
              handleReturnPet();
            }}
          >
            return to shelter
          </button>
        );
      } else {
        userActionBtn = (
          <>
            <button
              className="adopt-btn"
              onClick={() => {
                handleAdopt();
              }}
            >
              adopt now
            </button>
            <button
              className="adopt-btn"
              onClick={() => {
                handleFoster();
              }}
            >
              foster now
            </button>
          </>
        );
      }
    }
  }

  let mainDetailsContainer;
  if (!loading) {
    mainDetailsContainer = (
      <div className="main-details-container">
        <div className="animal-summary-container">
          <div className="img-container">
            <img
              src={`${baseServerUrl}/pet_images/${animal.imageFileName}`}
              alt={animal.name}
            ></img>
          </div>
          <div className="animal-basic-container">
            <span className="pet-details-header">
              <h1>{`${animal.name} the ${
                animal.breed.slice(0, 1).toUpperCase() +
                animal.breed.slice(1, animal.breed.length)
              }`}</h1>
              {loadingAdopt ? <Spinner /> : userActionBtn}
            </span>
            <span className="basic-info-row">
              <h4>type:</h4>
              <p>{animal.type}</p>
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
            <p>{animal.diet ? animal.diet : "none"}</p>
          </span>
        </div>
        {loadingSaved ? (
          <Spinner />
        ) : (
          <button
            className="bookmark-btn"
            onClick={
              user.savedPetIds && user.savedPetIds.includes(id)
                ? () => {
                    handleRemovePet();
                  }
                : () => {
                    handleSavePet();
                  }
            }
          >
            {user.savedPetIds && user.savedPetIds.includes(id)
              ? "remove from saved pets"
              : "add to saved pets"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="main-container">
      {loading ? <Spinner /> : mainDetailsContainer}
    </div>
  );
}

export default PetPage;
