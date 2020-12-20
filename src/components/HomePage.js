import React from "react";
import "../styles/HomePage.css";
import banner from "../banner.jpg";
import { useState } from "react";

function HomePage(props) {

  const onClickOpenModal = (formType) => {
    props.onOpenModal(formType)
  }


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
        PetCouture.com is a boutique animal shelter in the heart of Herzliya
        Pituach. Our mission is to pair discerning animal lovers with animals
        that appreciate the finer things in life. All our animals are locally
        sourced and vegan friendly. They have up-to-date vaccinations and each
        has its own signature cocktail recipe stored in its RFID chip.
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
