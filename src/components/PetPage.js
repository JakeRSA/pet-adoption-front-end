import React, { useEffect, useState, useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/PetPage.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function PetPage(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
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

  let userActionBtn;
  if (user.type === "admin") {
    userActionBtn = (
      <Link to={`/edit-pet/${animal._id}`}>
        <button className="adopt-btn">edit details</button>
      </Link>
    );
  } else {
    if (user._id === animal.carerId) {
      userActionBtn = <button className="adopt-btn">return to shelter</button>;
    } else {
      userActionBtn = (
        <>
          <button className="adopt-btn">adopt now</button>
          <button className="adopt-btn">foster now</button>
        </>
      );
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
              {userActionBtn}
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
        <button className="bookmark-btn">add to saved list</button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <span className="back-btn">
        <FontAwesomeIcon icon={faAngleLeft} />
        <p>back</p>
      </span>
      {loading || mainDetailsContainer}
    </div>
  );
}

export default PetPage;
