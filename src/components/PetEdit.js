import React from "react";
import "../styles/PetEdit.css";
import { useFormik } from "formik";

function PetEdit(props) {
  const animal = props.animal ? props.animal : {};
  const {
    name = "",
    type = "",
    breed = "",
    birthdate = "",
    weight = null,
    height = null,
    imageUrl = "",
    color = "",
    hypoallergenic = false,
    diet = "",
    bio = "",
  } = animal;

  const formik = useFormik({
    initialValues: {
      name,
      type,
      breed,
      birthdate,
      weight,
      height,
      imageUrl,
      color,
      hypoallergenic,
      diet,
      bio,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="main-container">
      <h1>Add New Animal</h1>
      <form className="add-edit-animal-form" onSubmit={formik.handleSubmit}>
        <span>
          <label htmlFor="name">name:</label>
          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          ></input>
        </span>
        <span>
          <label htmlFor="type">type:</label>
          <select
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            {props.animalTypeOptions}
          </select>
        </span>
        <span>
          <label htmlFor="breed">breed:</label>
          <input
            id="breed"
            name="breed"
            onChange={formik.handleChange}
            value={formik.values.breed}
          ></input>
        </span>
        <span>
          <label htmlFor="birthdate">birthdate:</label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
          ></input>
        </span>
        <span>
          <label htmlFor="weight">weight:</label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.weight}
          ></input>
          <p>kg</p>
        </span>
        <span>
          <label htmlFor="height">height:</label>
          <input
            id="height"
            name="height"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.height}
          ></input>
          <p>cm</p>
        </span>
        <span>
          <label htmlFor="color">color:</label>
          <input
            id="color"
            name="color"
            onChange={formik.handleChange}
            value={formik.values.color}
          ></input>
        </span>
        <span>
          <label htmlFor="hypoallergenic">hypoallergenic:</label>
          <select
            id="hypoallergenic"
            name="hypoallergenic"
            onChange={formik.handleChange}
            value={formik.values.hypoallergenic}
          >
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>
        </span>
        <span>
          <label htmlFor="diet">dietary restrictions:</label>
          <input
            id="diet"
            name="diet"
            onChange={formik.handleChange}
            value={formik.values.diet}
          ></input>
        </span>
        <span>
          <label htmlFor="bio">bio:</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="A short description detailing the animal's behaviour and history..."
            onChange={formik.handleChange}
            value={formik.values.bio}
          ></textarea>
        </span>
        <span>
          <label htmlFor="photo">photo:</label>
          <div className="img-select-container">
            <p>For best results, select an image with 1:1 aspect ratio</p>
            <input
              id="photo"
              name="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={formik.handleChange}
              value={formik.values.imageUrl}
            ></input>

            <div className="img-container">
              <img alt="preview" />
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
      </form>
    </div>
  );
}

export default PetEdit;
