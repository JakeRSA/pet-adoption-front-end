import React from "react";
import "../styles/HomePage.css";
import banner from "../banner.jpg";

function HomePage(props) {
  const onClickOpenModal = (formType) => {
    props.onOpenModal(formType);
  };

  return (
    <div className="center">
      <div className="banner-container">
        <img
          className="banner-image"
          src={banner}
          alt="puppies and kitties"
        ></img>
      </div>
      <p className="about-text">
        Le Compagnon is a boutique animal shelter. Our mission is to pair
        discerning animal lovers with animals that are accustomed to a certain
        standard of living. All our animals are locally sourced, vegan-friendly
        and each has its own signature cocktail. Please note that some of our
        animals refuse to be vaccinated. Le Compagnon is a a non-profit
        organization.
      </p>
      <span>
        <button
          onClick={() => {
            onClickOpenModal("newUser");
          }}
          className="home-sign-in-button"
        >
          BECOME A CLUB MEMBER
        </button>
        <button
          onClick={() => {
            onClickOpenModal("existingUser");
          }}
          className="home-sign-in-button"
        >
          SIGN IN TO YOUR ACCOUNT
        </button>
      </span>
    </div>
  );
}

export default HomePage;
