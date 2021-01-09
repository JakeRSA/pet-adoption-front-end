import React from "react";
import { useState, useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import "../styles/ProfilePage.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";
import Spinner from "./Spinner";
import SuccessModal from "./SuccessModal";

function ProfilePage(props) {
  const authConfig = useContext(AuthContext);
  const baseServerUrl = useContext(ServerContext);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [successText, setSuccessText] = useState("");
  const PhoneComponent = (props) => <PhoneInput country="AF" {...props} />;

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

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const openSuccessModal = (text) => {
    setSuccessText(text);
    setSuccessModalIsOpen(true);
    setTimeout(() => {
      setSuccessModalIsOpen(false);
    }, 2500);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phone: Yup.string()
      .required("Please enter a contact number")
      .matches(/^\d+$/, "Please enter a valid contact number"),
    email: Yup.string()
      .required("Please enter your email address")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address"
      ),
  });

  return (
    <div>
      <SuccessModal isOpen={successModalIsOpen} text={successText} />
      <ChangePasswordModal
        isOpen={modalIsOpen}
        onCloseModal={() => {
          handleCloseModal();
        }}
        openSuccessModal={() => {
          openSuccessModal("Successfully changed password");
        }}
        id={user._id}
      />

      <section className="main-section">
        <h1>My Profile</h1>
        <Formik
          initialValues={user}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            setLoadingSubmit(true);
            axios
              .put(baseServerUrl + "/user/" + user._id, values, authConfig)
              .then(() => {
                setLoadingSubmit(false);
                setCanEdit(false);
                openSuccessModal("Successfully updated profile");
              })
              .catch((err) => {
                if (err.response.data.email) {
                  actions.setFieldError("email", err.response.data.email);
                }
                setLoadingSubmit(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {loading ? (
            <Spinner />
          ) : (
            (props) => (
              <Form className="edit-profile-form">
                <fieldset>
                  <label htmlFor="firstName">First name</label>
                  <Field
                    id="firstName"
                    name="firstName"
                    className={`${canEdit || "no-edit-field"} ${
                      props.errors.firstName && "invalid-field"
                    }`}
                    disabled={!canEdit}
                  />
                  {props.errors.firstName && props.touched.firstName ? (
                    <div className="invalid-tooltip">
                      {props.errors.firstName}
                    </div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <label htmlFor="lastName">Last name</label>
                  <Field
                    id="lastName"
                    name="lastName"
                    className={`${canEdit || "no-edit-field"} ${
                      props.errors.lastName && "invalid-field"
                    }`}
                    disabled={!canEdit}
                  />
                  {props.errors.lastName && props.touched.lastName ? (
                    <div className="invalid-tooltip">
                      {props.errors.lastName}
                    </div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <label htmlFor="phone">Phone</label>
                  {canEdit ? (
                    <div>
                      <Field
                        as={PhoneComponent}
                        id="phone"
                        name="phone"
                        onChange={(event) => {
                          props.setFieldValue("phone", event);
                        }}
                        className={`"no-edit-field" ${
                          props.errors.phone && "invalid-field"
                        }`}
                        disabled={false}
                      />
                    </div>
                  ) : (
                    <div>
                      <Field
                        value={"+" + props.values.phone}
                        id="phone"
                        name="phone"
                        className={"no-edit-field"}
                        disabled={true}
                      />
                    </div>
                  )}
                  {props.errors.phone && props.touched.phone ? (
                    <div className="invalid-tooltip">{props.errors.phone}</div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    className={`${canEdit || "no-edit-field"} ${
                      props.errors.email && "invalid-field"
                    }`}
                    disabled={!canEdit}
                  />
                  {props.errors.email && props.touched.email ? (
                    <div className="invalid-tooltip">{props.errors.email}</div>
                  ) : null}
                </fieldset>
                <fieldset>
                  <label htmlFor="bio">Short bio</label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    className={canEdit || "no-edit-field"}
                    disabled={!canEdit}
                  />
                </fieldset>

                <span className="do-stuff-btns">
                  {loadingSubmit ? (
                    <Spinner />
                  ) : (
                    <>
                      {canEdit ? (
                        <>
                          <button className="button-1" type="submit">
                            Save changes
                          </button>
                          <button
                            className="button-1"
                            onClick={() => {
                              props.resetForm();
                              setCanEdit(false);
                            }}
                          >
                            Cancel changes
                          </button>
                        </>
                      ) : (
                        <button
                          className="button-1"
                          onClick={() => {
                            setCanEdit(true);
                          }}
                        >
                          Edit profile
                        </button>
                      )}
                      <button
                        className="button-1"
                        onClick={() => {
                          setModalIsOpen(true);
                        }}
                      >
                        Change password
                      </button>
                    </>
                  )}
                </span>
              </Form>
            )
          )}
        </Formik>
      </section>
    </div>
  );
}

export default ProfilePage;
