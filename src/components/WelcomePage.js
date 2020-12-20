import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import "../styles/WelcomePage.css";
import NavCard from "./NavCard";
import ProfilePage from "./ProfilePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function WelcomePage(props) {
  return (
    <Router>
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
                <NavCard type={"myPets"} />
                <NavCard type={"savedPets"} />
                <Link className="visited" to="/profile">
                  <NavCard type={"myProfile"} />
                </Link>
              </div>
            </section>
          </div>
        </Route>
        <Route path="/profile">
          <ProfilePage currentUser={props.currentUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default WelcomePage;
