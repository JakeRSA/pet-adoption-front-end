import React from "react";
import "../styles/HomePage.css";
import banner from "../banner.jpg";
import Header from "./Header";
import SignUpModal from "./SignUpModal";
import { useState } from "react";

function HomePage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const handleOpenModal = (formType) => {
    if (formType === "newUser") {
      setIsNewUser(true);
    } else setIsNewUser(false);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="center">
      <SignUpModal
        isOpen={modalIsOpen}
        onCloseModal={handleCloseModal}
        isNewUser={isNewUser}
        onSignUp={(values) => {
          props.handleSignUpSubmit(values);
        }}
        onSignIn={(values) => {
          props.handleSignInSubmit(values);
        }}
      />
      <Header
        isSignedIn={false}
        onLogInClick={() => {
          handleOpenModal("existingUser");
        }}
      />
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
            handleOpenModal("newUser");
          }}
          className="home-sign-in-button"
        >
          BECOME A CLUB MEMBER
        </button>
        <button
          onClick={() => {
            handleOpenModal("existingUser");
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
