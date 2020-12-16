import React from "react";
import Modal from "react-modal";
import "../styles/SignUpModal.css";
import closeIcon from "../close.png";
import { useFormik } from "formik";
import { useState } from "react";

function SignUpModal(props) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      props.isNewUser ? props.onSignUp(values) : props.onSignIn(values);
    },
  });

  const nameFormFields = (
    <>
      <fieldset>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        ></input>{" "}
      </fieldset>
      <fieldset>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        ></input>{" "}
      </fieldset>
    </>
  );

  return (
    <Modal
      className="sign-up-modal"
      isOpen={props.isOpen}
      onRequestClose={() => {
        props.onCloseModal();
      }}
    >
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
      <form className="sign-up-form" onSubmit={formik.handleSubmit}>
        {props.isNewUser && nameFormFields}
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          ></input>
        </fieldset>
        {props.isNewUser && (
          <fieldset>
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phone}
            ></input>
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>
        </fieldset>
        {props.isNewUser && (
          <fieldset>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            ></input>
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
