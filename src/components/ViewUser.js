import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import PetCardList from "./PetCardList";
import "../styles/ViewUser.css";
import Spinner from "./Spinner";

function ViewUser() {
  const { id } = useParams();
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [petsLoading, setPetsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios.get(baseServerUrl + `/user/${id}/full`).then((user) => {
      setUser(user.data);
      setPetsLoading(true);
      axios.get(baseServerUrl + "/pet/user/" + id, authConfig).then((pets) => {
        setPets(pets.data);
        setPetsLoading(false);
      });
      setProfileLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  let userDetails = <></>;
  if (profileLoading) {
    userDetails = <Spinner />;
  } else {
    userDetails = (
      <div className="view-user-details">
        <span className="contact-info">
          <span className="email-span">
            <h4>email:</h4>
            <p>{user.email}</p>
          </span>
          <span className="phone-span">
            <h4>phone:</h4>
            <p>{user.phone}</p>
          </span>
        </span>

        {user.bio && (
          <span className="bio-span">
            <h4>bio:</h4>
            <p>user.bio</p>
          </span>
        )}
        <h2 className="sub-heading">{user.firstName}'s Pets</h2>
        {petsLoading ? (
          <Spinner />
        ) : (
          <>
            {pets.length > 0 ? (
              <PetCardList pets={pets} />
            ) : (
              <p>this user does not have any pets</p>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>
        {user.firstName ? user.firstName + " " + user.lastName : "View Profile"}{" "}
      </h1>
      {userDetails}
    </div>
  );
}

export default ViewUser;
