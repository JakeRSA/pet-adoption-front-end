import React from "react";
import SearchBar from "./SearchBar";
import "../styles/WelcomePage.css";
import NavCard from "./NavCard";
import { Switch, Route, Link } from "react-router-dom";

function WelcomePage(props) {
  return (
    <Switch>
      <Route exact path="/">
        <div>
          <section className="main-section">
            <h1 className="welcome-msg">{`Welcome, ${props.currentUser.firstName} ${props.currentUser.lastName}`}</h1>
            <div className="search-container">
              <SearchBar />
              <button className="advanced-btn">advanced search</button>
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
      </Route>
    </Switch>
  );
}

export default WelcomePage;
