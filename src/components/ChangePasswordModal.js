import React, { useContext, useState } from "react";
import "../styles/SignUpModal.css";
import closeIcon from "../close.png";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";
import Spinner from "./Spinner";

function ChangePasswordModal(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .matches(
        "^(?=.*?\\d.*\\d)[a-zA-Z0-9]{6,}$",
        "Password must be longer than 6 characters and include a combination of letters and at least 2 digits"
      ),
    newPasswordConfirm: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match"),
  });

  return (
    <div>
      <Modal
        className="sign-up-modal"
        isOpen={props.isOpen}
        onRequestClose={props.onCloseModal}
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
        <h1 className="sign-up-header">Change Password</h1>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          onSubmit={(values, actions) => {
            setLoadingSubmit(true);
            axios
              .put(
                baseServerUrl + `/user/${props.id}/password`,
                values,
                authConfig
              )
              .then(() => {
                setLoadingSubmit(false);
              })
              .catch((err) => {
                if (err.response.data.password)
                  actions.setFieldError("oldPassword", "Incorrect password");
                setLoadingSubmit(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="change-password-form">
              <fieldset>
                <label htmlFor="oldPassword">Old password</label>
                <Field
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className={
                    errors.oldPassword && touched.oldPassword && "invalid-field"
                  }
                />
                {errors.oldPassword && touched.oldPassword ? (
                  <div className="invalid-tooltip">{errors.oldPassword}</div>
                ) : null}
              </fieldset>
              <fieldset>
                <label htmlFor="newPassword">New password</label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={
                    errors.newPassword && touched.newPassword && "invalid-field"
                  }
                />
                {errors.newPassword && touched.newPassword ? (
                  <div className="invalid-tooltip">{errors.newPassword}</div>
                ) : null}
              </fieldset>
              <fieldset>
                <label htmlFor="newPasswordConfirm">Confirm new password</label>
                <Field
                  type="password"
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  className={
                    errors.newPasswordConfirm &&
                    touched.newPasswordConfirm &&
                    "invalid-field"
                  }
                />
                {errors.newPasswordConfirm && touched.newPasswordConfirm ? (
                  <div className="invalid-tooltip">
                    {errors.newPasswordConfirm}
                  </div>
                ) : null}
              </fieldset>
              <div className="submit-container">
                {loadingSubmit ? (
                  <Spinner />
                ) : (
                  <button className="submit" type="submit">
                    submit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
