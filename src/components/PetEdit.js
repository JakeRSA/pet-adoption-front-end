import React from "react";
import "../styles/PetEdit.css";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import axios from "axios";

function PetEdit(props) {
  const [petImage, setpetImage] = useState(null);

  const animal = props.animal ? props.animal : {};
  const {
    name = "",
    type = "",
    breed = "",
    birthdate = "",
    weight = 0,
    height = 0,
    image = undefined,
    color = "",
    hypoallergenic = false,
    diet = "",
    bio = "",
  } = animal;

  // const formik = useFormik({
  //   initialValues: {
  //     name,
  //     type,
  //     breed,
  //     birthdate,
  //     weight,
  //     height,
  //     image,
  //     color,
  //     hypoallergenic,
  //     diet,
  //     bio,
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //     // axios.post("http://localhost:5000/pet", values, props.authConfig);
  //   },
  // });
  return (
    <div className="main-container">
      <h1>Add New Animal</h1>
      <Formik
        initialValues={{
          name,
          type,
          breed,
          birthdate,
          weight,
          height,
          image,
          color,
          hypoallergenic,
          diet,
          bio,
        }}
        onSubmit={(values) => {
          console.log(values);
          // axios.post("http://localhost:5000/pet", values, props.authConfig);
        }}
        // method="POST"
        // action={props.baseServerUrl + "/pet"}
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
                {props.animalTypeOptions}
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
                      props.values.imageFile &&
                      URL.createObjectURL(props.values.imageFile)
                    }
                    alt="preview"
                  />
                </div>
              </div>
            </span>
            <span className="submit-span">
              <input
                className="submit"
                type="submit"
                value="add new animal"
              ></input>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PetEdit;
