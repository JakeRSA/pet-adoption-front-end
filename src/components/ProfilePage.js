import React from "react";
import { useFormik } from "formik";
import { useState, useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import "../styles/ProfilePage.css";
import axios from "axios";

function ProfilePage(props) {
  const authConfig = useContext(AuthContext);
  const baseServerUrl = useContext(ServerContext);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    let mounted = true;
    axios.get(baseServerUrl + "/currentuser", authConfig).then((user) => {
      setUser(user.data);
      if (mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <section className="main-section">
        <h1>My Profile</h1>
        <Formik
          initialValues={user}
          enableReinitialize={true}
          onSubmit={(values) => {
            axios
              .put(
                props.baseServerUrl + "/user/" + props.currentUser._id,
                values,
                props.authConfig
              )
              .then(setCanEdit(false))
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          {(props) => (
            <Form>
              <fieldset>
                <label htmlFor="firstName">First name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  className={canEdit || "no-edit-field"}
                  disabled={!canEdit}
                ></Field>
              </fieldset>
              <fieldset>
                <label htmlFor="lastName">Last name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  className={canEdit || "no-edit-field"}
                  disabled={!canEdit}
                ></Field>
              </fieldset>
              <fieldset>
                <label htmlFor="phone">Phone</label>
                <Field
                  id="phone"
                  name="phone"
                  className={canEdit || "no-edit-field"}
                  disabled={!canEdit}
                ></Field>
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  className={canEdit || "no-edit-field"}
                  disabled={!canEdit}
                ></Field>
              </fieldset>
              <fieldset>
                <label htmlFor="bio">Short bio</label>
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  className={canEdit || "no-edit-textarea"}
                  disabled={!canEdit}
                ></Field>
              </fieldset>

              <span className="do-stuff-btns">
                {canEdit ? (
                  <>
                    <button type="submit">Save changes</button>
                    <button
                      onClick={() => {
                        setCanEdit(false);
                      }}
                    >
                      Cancel changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setCanEdit(true);
                    }}
                  >
                    Edit profile
                  </button>
                )}
                <button>Change password</button>
              </span>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default ProfilePage;
