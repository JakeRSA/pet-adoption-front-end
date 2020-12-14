import React from "react";
import Modal from "react-modal";
import "../styles/SignUpModal.css";
import { useFormik } from "formik";

function SignUpModal(props) {
  return (
    <Modal className="sign-up-modal" isOpen={true}>
      <h1 className="sign-up-header">Join PetCouture.com</h1>
      <form className="sign-up-form">
        <fieldset>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName"></input>{" "}
        </fieldset>
        <fieldset>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName"></input>{" "}
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="email"></input>
        </fieldset>
        <fieldset>
          <label htmlFor="phone">Phone number</label>
          <input id="phone" type="tel"></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input id="password" type="password"></input>
        </fieldset>
        <fieldset>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input id="passwordConfirm" type="password"></input>
        </fieldset>
        <div className="submit-container">

        <button className="submit" type="submit">Join</button>
        </div>
      </form>
    </Modal>
  );
}

export default SignUpModal;
