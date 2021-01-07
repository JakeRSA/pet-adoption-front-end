import React, { useEffect, useState, useContext } from "react";
import "../styles/PetEdit.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";

function PetEdit() {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [animal, setAnimal] = useState({
    name: "",
    type: "dog",
    breed: "",
    birthdate: "",
    weight: 0,
    height: 0,
    imageFile: undefined,
    imageFileName: "",
    color: "",
    hypoallergenic: false,
    diet: "",
    bio: "",
  });

  useEffect(() => {
    let mounted = true;
    if (id) {
      setLoading(true);
      axios.get(baseServerUrl + `/pet/${id}`).then((animal) => {
        let animalObj = animal.data;
        animalObj.birthdate = formatBirthdate(animal.data.birthdate);
        setAnimal(animalObj);
        setLoading(false);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  const animalTypeOptions = [
    "dog",
    "cat",
    "mammal",
    "bird",
    "rodent",
    "fish",
    "reptile",
    "insect",
    "other",
  ].map((type) => {
    return (
      <option key={type} value={type}>
        {type}
      </option>
    );
  });

  const formatBirthdate = (birthdate) => {
    const bd = new Date(birthdate);
    const yyyy = bd.getFullYear();
    const mm =
      bd.getMonth() < 9 ? `0${bd.getMonth() + 1}` : `${bd.getMonth() + 1}`;
    const dd = bd.getDate() < 9 ? `0${bd.getDate()}` : `${bd.getDate()}`;
    return `${yyyy}-${mm}-${dd}`;
  };

  const numberInputOnly = (event, formikProps) => {
    event.preventDefault();
    const { value } = event.target;
    const regex = /^\d+$/;
    if (!value || regex.test(value.toString())) {
      formikProps.setFieldValue(event.target.name, value);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a name"),
    breed: Yup.string().required("Please enter a breed or species"),
    birthdate: Yup.date()
      .required("Please enter a birthdate")
      .max(
        formatBirthdate(new Date().getTime()),
        "Animal must have already been born to be added to the database"
      ),
    weight: Yup.number().min(1, "Weight must be at least 1kg"),
    height: Yup.number().min(1, "Please enter height"),
    color: Yup.string().required("Please enter a color"),
    bio: Yup.string().required("Please enter a bio"),
    imageFile: !id ? Yup.mixed().required("Please add a photo") : undefined,
  });

  return (
    <div className="main-container">
      <h1>{id ? "Edit Animal" : "Add New Animal"}</h1>
      {loading ? (
        <h4>loading</h4>
      ) : (
        <Formik
          initialValues={animal}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLoadingUpdate(true);
            let data = new FormData();
            for (let key of Object.keys(values)) {
              data.append(key, values[key]);
            }
            if (id) {
              axios
                .put(`${baseServerUrl}/pet/${id}`, data, authConfig)
                .then((res) => {
                  setLoadingUpdate(false);
                  history.push("/pet/" + id);
                })
                .catch((e) => {
                  console.log(e.response.data);
                  setLoadingUpdate(false);
                });
            } else {
              axios
                .post(`${baseServerUrl}/pet`, data, authConfig)
                .then((res) => {
                  setLoadingUpdate(false);
                  history.push("/pet/" + res.data);
                })
                .catch((e) => {
                  console.log(e.response.data);
                  setLoadingUpdate(false);
                });
            }
          }}
        >
          {(props) => (
            <Form
              className="add-edit-animal-form"
              encType="multipart/form-data"
            >
              <span>
                <fieldset>
                  <label htmlFor="name">name:</label>
                  <Field
                    id="name"
                    name="name"
                    className={
                      props.errors.name && props.touched.name && "invalid-field"
                    }
                  />
                  {props.errors.name && props.touched.name ? (
                    <div className="invalid-tooltip">{props.errors.name}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="type">type:</label>
                  <Field as="select" id="type" name="type">
                    {animalTypeOptions}
                  </Field>
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="breed">breed:</label>
                  <Field
                    id="breed"
                    name="breed"
                    className={
                      props.errors.breed &&
                      props.touched.breed &&
                      "invalid-field"
                    }
                  />
                  {props.errors.breed && props.touched.breed ? (
                    <div className="invalid-tooltip">{props.errors.breed}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="birthdate">birthdate:</label>
                  <Field
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    className={
                      props.errors.birthdate &&
                      props.touched.birthdate &&
                      "invalid-field"
                    }
                  />
                  {props.errors.birthdate && props.touched.birthdate ? (
                    <div className="invalid-tooltip">
                      {props.errors.birthdate}
                    </div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="weight">weight:</label>
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={(e) => {
                      numberInputOnly(e, props);
                    }}
                    className={
                      props.errors.weight &&
                      props.touched.weight &&
                      "invalid-field"
                    }
                  />
                  <p>kg</p>
                  {props.errors.weight && props.touched.weight ? (
                    <div className="invalid-tooltip">{props.errors.weight}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="height">height:</label>
                  <Field
                    id="height"
                    name="height"
                    type="number"
                    onChange={(e) => {
                      numberInputOnly(e, props);
                    }}
                    className={
                      props.errors.height &&
                      props.touched.height &&
                      "invalid-field"
                    }
                  />
                  <p>cm</p>
                  {props.errors.height && props.touched.height ? (
                    <div className="invalid-tooltip">{props.errors.height}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="color">color:</label>
                  <Field
                    id="color"
                    name="color"
                    className={
                      props.errors.color &&
                      props.touched.color &&
                      "invalid-field"
                    }
                  />
                  {props.errors.color && props.touched.color ? (
                    <div className="invalid-tooltip">{props.errors.color}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="hypoallergenic">hypoallergenic:</label>
                  <Field as="select" id="hypoallergenic" name="hypoallergenic">
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                  </Field>
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <label htmlFor="diet">dietary restrictions:</label>
                  <Field id="diet" name="diet" />
                </fieldset>
              </span>

              <span>
                <fieldset className="animal-bio-fieldset">
                  <label htmlFor="bio">bio:</label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    placeholder="A short description detailing the animal's behaviour and history..."
                    className={
                      props.errors.bio && props.touched.bio && "invalid-field"
                    }
                  />
                  {props.errors.bio && props.touched.bio ? (
                    <div className="invalid-tooltip">{props.errors.bio}</div>
                  ) : null}
                </fieldset>
              </span>
              <span>
                <fieldset className="animal-image-fieldset">
                  <label htmlFor="photo">photo:</label>
                  <div className="img-select-container">
                    <p>
                      For best results, select an image with 1:1 aspect ratio
                    </p>
                    <Field
                      id="photo"
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        props.setFieldValue("imageFile", event.target.files[0]);
                      }}
                      className={
                        props.errors.imageFile &&
                        props.touched.imageFile &&
                        "invalid-field"
                      }
                    />
                    {props.errors.imageFile && props.touched.imageFile ? (
                      <div className="invalid-tooltip">
                        {props.errors.imageFile}
                      </div>
                    ) : null}
                    <div
                      className={`img-container ${
                        props.errors.imageFile &&
                        props.touched.imageFile &&
                        "invalid-image-container"
                      }`}
                    >
                      <img
                        src={
                          props.values.imageFile
                            ? URL.createObjectURL(props.values.imageFile)
                            : baseServerUrl +
                              "/pet_images/" +
                              animal.imageFileName
                        }
                        alt="preview"
                      />
                    </div>
                  </div>
                </fieldset>
              </span>
              <span className="submit-span">
                {id ? (
                  <input
                    className="submit"
                    type="submit"
                    value="save changes"
                  ></input>
                ) : (
                  <input
                    className="submit"
                    type="submit"
                    value="add new animal"
                  ></input>
                )}
              </span>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default PetEdit;
