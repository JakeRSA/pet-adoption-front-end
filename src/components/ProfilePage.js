import React from "react";
import Header from "./Header";
import { useFormik } from "formik";
import { useState } from "react";
import "../styles/ProfilePage.css";

function ProfilePage(props) {
  const [canEdit, setCanEdit] = useState(false);

  const formik = useFormik({
    initialValues: props.currentUser,
  });

  return (
    <div>
      <section className="main-section">
        <h1>My Profile</h1>
        <form>
          <fieldset>
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              className={canEdit || "no-edit-field"}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              disabled={!canEdit}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              className={canEdit || "no-edit-field"}
              value={formik.values.lastName}
              disabled={!canEdit}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className={canEdit || "no-edit-field"}
              value={formik.values.phone}
              disabled={!canEdit}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={"no-edit-field"}
              value={formik.values.email}
              disabled={true}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="bio">Short bio</label>
            <textarea
              id="bio"
              className={canEdit || "no-edit-textarea"}
              value={formik.values.bio}
              disabled={!canEdit}
            ></textarea>
          </fieldset>
        </form>
        <span className="do-stuff-btns">
          <button
            onClick={canEdit ? () => setCanEdit(false) : () => setCanEdit(true)}
          >
            {canEdit ? "Save changes" : "Edit profile"}
          </button>
          <button>Change password</button>
        </span>
      </section>
    </div>
  );
}

export default ProfilePage;
