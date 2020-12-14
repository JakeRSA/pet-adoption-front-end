import React from "react";
import "../styles/Header.css";
import searchImg from "../search.svg";

function Header(props) {
  return (
    <div className="header">
      <h1 className="company-logo">PETCOUTURE.COM</h1>
      <span className="mini-tools">
        <input
          className="mini-search-btn"
          type="image"
          src={searchImg}
          alt="Search"
        />
        <button className="mini-login" onClick={props.onLogInClick}>
          LOGIN
        </button>
      </span>
    </div>
  );
}

export default Header;
