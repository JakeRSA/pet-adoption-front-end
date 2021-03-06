import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import searchImg from "../search.svg";

function Header(props) {
  const signInButton = (
    <button className="mini-login" onClick={props.onLogInClick}>
      LOGIN
    </button>
  );
  const logOutButton = (
    <button className="mini-login" onClick={props.onLogOutClick}>
      LOG OUT
    </button>
  );

  return (
    <div className="header">
      <Link className="visited" to="/">
        <h1 className="company-logo">LE COMPAGNON</h1>
      </Link>
      <span className="mini-tools">
        <Link className="visited flex-align-center" to="/search">
          <input
            className="mini-search-btn"
            type="image"
            src={searchImg}
            alt="Search"
          />
        </Link>
        {props.isSignedIn ? (
          <Link className="visited" to="/">
            {logOutButton}
          </Link>
        ) : (
          signInButton
        )}
      </span>
    </div>
  );
}

export default Header;
