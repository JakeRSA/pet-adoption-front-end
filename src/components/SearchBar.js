import React from "react";
import "../styles/SearchBar.css";

function SearchBar() {
  return (
    <form className="search-bar">
      <input type="text" placeholder="search by species..."></input>
      <button type="submit">search</button>
    </form>
  );
}

export default SearchBar;
