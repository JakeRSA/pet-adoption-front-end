import React from "react";
import "../styles/HomePage.css";
import banner from "../banner.jpg";
import Header from "./Header";

function HomePage() {
  return (
    <div className="center height-to-viewport">
      <Header />
      <div className="banner-container">
        <img
          className="banner-image"
          src={banner}
          alt="puppies and kitties"
        ></img>
      </div>
      <p className="about-text">
        PetCouture.com is a boutique animal shelter in the heart of Herzliya
        Pituach. Our mission is to pair discerning animal lovers with animals
        that appreciate the finer things in life. All our animals are locally
        sourced and vegan friendly. They have up-to-date vaccinations and each
        has its own signature cocktail recipe stored in its RFID chip.
      </p>
      <span>
        <button className="home-sign-in-button">BECOME A CLUB MEMBER</button>
        <button className="home-sign-in-button">SIGN IN TO YOUR ACCOUNT</button>
      </span>
    </div>
  );
}

export default HomePage;
