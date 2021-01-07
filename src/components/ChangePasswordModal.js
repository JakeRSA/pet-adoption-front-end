import React, { useContext } from "react";
import "../styles/SignUpModal.css";
import closeIcon from "../close.png";
import Modal from "react-modal";
import { useFormik } from "formik";
import axios from "axios";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";

function ChangePasswordModal(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    onSubmit: (values) => {
      axios
        .put(baseServerUrl + `/user/${props.id}/password`, values, authConfig)
        .then(console.log("done"))
        .catch((err) => {
          console.log(err);
        });
    },
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
        <form className="change-password-form" onSubmit={formik.handleSubmit}>
          <fieldset>
            <label for="oldPassword">Old password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
            />
          </fieldset>
          <fieldset>
            <label for="newPassword">New password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
          </fieldset>
          <fieldset>
            <label for="newPasswordConfirm">Confirm new password</label>
            <input
              type="password"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              onChange={formik.handleChange}
              value={formik.values.newPasswordConfirm}
            />
          </fieldset>
          <div className="submit-container">
            <button className="submit" type="submit">
              submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
