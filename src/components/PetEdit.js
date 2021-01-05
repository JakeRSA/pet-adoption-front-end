import React, { useEffect, useState, useContext } from "react";
import "../styles/PetEdit.css";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import ServerContext from "../contexts/ServerContext";
import AuthContext from "../contexts/AuthContext";

function PetEdit(props) {
  const baseServerUrl = useContext(ServerContext);
  const authConfig = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="main-container">
      <h1>{id ? "Edit Animal" : "Add New Animal"}</h1>
      <Formik
        initialValues={animal}
        enableReinitialize={true}
        onSubmit={(values) => {
          let data = new FormData();
          for (let key of Object.keys(values)) {
            data.append(key, values[key]);
          }
          if (id) {
            axios
              .put(`${baseServerUrl}/pet/${id}`, data, authConfig)
              .catch((e) => console.log(e.response.data));
          } else {
            axios.post(`${baseServerUrl}/pet`, data, authConfig).catch((e) => {
              console.log(e.response.data);
            });
          }
        }}
      >
        {(props) => (
          <Form className="add-edit-animal-form" encType="multipart/form-data">
            <span>
              <label htmlFor="name">name:</label>
              <Field id="name" name="name"></Field>
            </span>
            <span>
              <label htmlFor="type">type:</label>
              <Field as="select" id="type" name="type">
                {animalTypeOptions}
              </Field>
            </span>
            <span>
              <label htmlFor="breed">breed:</label>
              <Field id="breed" name="breed"></Field>
            </span>
            <span>
              <label htmlFor="birthdate">birthdate:</label>
              <Field id="birthdate" name="birthdate" type="date"></Field>
            </span>
            <span>
              <label htmlFor="weight">weight:</label>
              <Field id="weight" name="weight" type="number"></Field>
              <p>kg</p>
            </span>
            <span>
              <label htmlFor="height">height:</label>
              <Field id="height" name="height" type="number"></Field>
              <p>cm</p>
            </span>
            <span>
              <label htmlFor="color">color:</label>
              <Field id="color" name="color"></Field>
            </span>
            <span>
              <label htmlFor="hypoallergenic">hypoallergenic:</label>
              <Field as="select" id="hypoallergenic" name="hypoallergenic">
                <option value={true}>yes</option>
                <option value={false}>no</option>
              </Field>
            </span>
            <span>
              <label htmlFor="diet">dietary restrictions:</label>
              <Field id="diet" name="diet"></Field>
            </span>
            <span>
              <label htmlFor="bio">bio:</label>
              <Field
                as="textarea"
                id="bio"
                name="bio"
                placeholder="A short description detailing the animal's behaviour and history..."
              ></Field>
            </span>
            <span>
              <label htmlFor="photo">photo:</label>
              <div className="img-select-container">
                <p>For best results, select an image with 1:1 aspect ratio</p>
                <Field
                  id="photo"
                  name="image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(event) => {
                    props.setFieldValue("imageFile", event.target.files[0]);
                  }}
                ></Field>
                <div className="img-container">
                  <img
                    src={
                      props.values.imageFile
                        ? URL.createObjectURL(props.values.imageFile)
                        : baseServerUrl + "/pet_images/" + animal.imageFileName
                    }
                    alt="preview"
                  />
                </div>
              </div>
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
    </div>
  );
}

export default PetEdit;
