import React from "react";
import SearchBar from "./SearchBar";
import "../styles/WelcomePage.css";
import NavCard from "./NavCard";
import { Link, useHistory } from "react-router-dom";

function WelcomePage(props) {
  let history = useHistory();
  const handleSearch = (values) => {
    history.push("/search?type=" + values.type);
  };

  return (
    <div>
      <section className="main-section">
        <h1 className="welcome-msg">{`Welcome, ${props.currentUser.firstName} ${props.currentUser.lastName}`}</h1>

        <div className="width-100 flex-justify-center">
          <div className="search-container">
            <SearchBar onSubmit={handleSearch} />
            <Link className="visited" to="/search?advanced">
              <button className="advanced-btn">advanced search</button>
            </Link>
          </div>
        </div>
        <div className="nav-cards">
          {props.currentUser.type === "admin" ? (
            <>
              <Link className="visited" to="/manage-users">
                <NavCard type={"userList"} />
              </Link>
              <Link className="visited" to="/all-pets">
                <NavCard type={"animalList"} />
              </Link>
            </>
          ) : (
            <>
              <Link className="visited" to="my-pets">
                <NavCard type={"myPets"} />
              </Link>
              <Link className="visited" to="saved-pets">
                <NavCard type={"savedPets"} />
              </Link>
            </>
          )}
          <Link className="visited" to="/profile">
            <NavCard type={"myProfile"} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
