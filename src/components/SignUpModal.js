import React from "react";
import Modal from "react-modal";
import "../styles/SignUpModal.css";
import closeIcon from "../close.png";
import { useFormik } from "formik";

function SignUpModal(props) {
  const nameFormFields = (
    <>
      <fieldset>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName"></input>{" "}
      </fieldset>
      <fieldset>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName"></input>{" "}
      </fieldset>
    </>
  );

  return (
    <Modal className="sign-up-modal" isOpen={props.isOpen}>
      <div className="close-btn-container">
        <input
          className="close-btn"
          type="image"
          src={closeIcon}
          alt="close"
          onClick={props.onCloseModal}
        ></input>
      </div>
      <h1 className="sign-up-header">
        {props.isNewUser ? "JOIN PETCOUTURE.COM" : "SIGN IN TO YOUR ACCOUNT"}
      </h1>
      <form className="sign-up-form">
        {props.isNewUser && nameFormFields}
        <fieldset>
          <label htmlFor="email">Email</label>
          <input id="email" type="email"></input>
        </fieldset>
        {props.isNewUser && (
          <fieldset>
            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="tel"></input>
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="password">Password</label>
          <input id="password" type="password"></input>
        </fieldset>
        {props.isNewUser && (
          <fieldset>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input id="passwordConfirm" type="password"></input>
          </fieldset>
        )}
        <div className="submit-container">
          <button className="submit" type="submit">
            {props.isNewUser ? "JOIN" : "LOGIN"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default SignUpModal;
