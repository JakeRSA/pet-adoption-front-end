import React, { useContext, useState } from "react";
import Modal from "react-modal";
import "../styles/SignUpModal.css";
import closeIcon from "../close.png";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ServerContext from "../contexts/ServerContext";
import Spinner from "./Spinner";

function SignUpModal(props) {
  const baseServerUrl = useContext(ServerContext);
  const isNewUser = props.isNewUser;
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const PhoneComponent = (props) => <PhoneInput country="AF" {...props} />;

  const handleSignUpSubmit = (formValues, actions) => {
    setLoadingSubmit(true);
    axios
      .post(baseServerUrl + "/signup", formValues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        handleSignInSubmit(
          {
            email: formValues.email,
            password: formValues.password,
          },
          actions
        );
        setLoadingSubmit(false);
      })
      .catch((e) => {
        if (e.response.data.email) {
          actions.setFieldError(
            "email",
            "There is already an account registered under this email address"
          );
        }
        setLoadingSubmit(false);
      });
  };

  const handleSignInSubmit = (formValues, actions) => {
    setLoadingSubmit(true);
    axios
      .post(baseServerUrl + "/login", formValues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("user_email", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        props.setAuthConfig({
          headers: {
            authorization: "Bearer " + res.data.accessToken,
            user_email: res.data.user,
          },
        });
        setLoadingSubmit(false);
      })
      .catch((e) => {
        if (e.response.data.email) {
          actions.setFieldError(
            "email",
            "We couldn't find this email address in our database. Sorry!"
          );
        } else if (e.response.data.password) {
          actions.setFieldError("password", "Incorrect password");
        }
        setLoadingSubmit(false);
      });
  };
  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .required("Please enter your email address")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address"
      ),
    phone: Yup.string()
      .required("Please enter a contact number")
      .matches(/^\d+$/, "Please enter a valid contact number"),
    password: Yup.string()
      .required("Please choose a password")
      .matches(
        "^(?=.*?\\d.*\\d)[a-zA-Z0-9]{6,}$",
        "Password must be longer than 6 characters and include a combination of letters and at least 2 digits"
      ),
    passwordConfirm: Yup.string()
      .required("Please enter your password again")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  });

  const logInValidationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password"),
  });

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
        {isNewUser ? "JOIN PETCOUTURE.COM" : "SIGN IN TO YOUR ACCOUNT"}
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values, actions) => {
          isNewUser
            ? handleSignUpSubmit(values, actions)
            : handleSignInSubmit(values, actions);
        }}
        validationSchema={
          isNewUser ? signUpValidationSchema : logInValidationSchema
        }
      >
        {(props) => (
          <Form className="sign-up-form">
            {isNewUser && (
              <>
                <fieldset>
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    id="firstName"
                    name="firstName"
                    className={props.errors.firstName && "invalid-field"}
                  ></Field>
                  {props.errors.firstName && props.touched.firstName ? (
                    <div className="invalid-tooltip">
                      {props.errors.firstName}
                    </div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    id="lastName"
                    name="lastName"
                    className={props.errors.lastName && "invalid-field"}
                  ></Field>
                  {props.errors.lastName && props.touched.lastName ? (
                    <div className="invalid-tooltip">
                      {props.errors.lastName}
                    </div>
                  ) : null}
                </fieldset>
              </>
            )}
            <fieldset>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={props.errors.email && "invalid-field"}
              ></Field>
              {props.errors.email && props.touched.email ? (
                <div className="invalid-tooltip">{props.errors.email}</div>
              ) : null}
            </fieldset>
            {isNewUser && (
              <fieldset>
                <label htmlFor="phone">Phone number</label>
                <div className="phone-field-container">
                  <Field
                    as={PhoneComponent}
                    id="phone"
                    name="phone"
                    onChange={(event) => {
                      props.setFieldValue("phone", event);
                    }}
                  />
                </div>
                {props.errors.phone && props.touched.phone ? (
                  <div className="invalid-tooltip">{props.errors.phone}</div>
                ) : null}
              </fieldset>
            )}
            <fieldset>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={
                  props.errors.password &&
                  props.touched.password &&
                  "invalid-field"
                }
              ></Field>
              {props.errors.password && props.touched.password ? (
                <div className="invalid-tooltip">{props.errors.password}</div>
              ) : null}
            </fieldset>
            {isNewUser && (
              <fieldset>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Field
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  className={
                    props.errors.passwordConfirm &&
                    props.touched.passwordConfirm &&
                    "invalid-field"
                  }
                ></Field>
                {props.errors.passwordConfirm &&
                props.touched.passwordConfirm ? (
                  <div className="invalid-tooltip">
                    {props.errors.passwordConfirm}
                  </div>
                ) : null}
              </fieldset>
            )}
            <div className="submit-container">
              {loadingSubmit ? (
                <Spinner />
              ) : (
                <button className="submit" type="submit">
                  {isNewUser ? "JOIN" : "LOGIN"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default SignUpModal;
