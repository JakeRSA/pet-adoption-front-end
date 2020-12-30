import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import SearchBar from "./SearchBar";
import "../styles/SearchPage.css";

function SearchPage(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      minHeight: 0,
      maxHeight: 0,
      minWeight: 0,
      maxWeight: 0,
      type: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [isAdvanced, setisAdvanced] = useState(props.isAdvanced);

  const handleToggleAdvanced = () => {
    setisAdvanced(!isAdvanced);
  };

  const toggle = (
    <button
      className="advanced-btn"
      onClick={() => {
        handleToggleAdvanced();
      }}
    >
      {isAdvanced ? "or use basic search" : "or use advanced search"}
    </button>
  );

  const animalTypesToOptions = () => {
    const types = [
      "dog",
      "cat",
      "bird",
      "rodent",
      "fish",
      "reptile",
      "insect",
      "other",
    ];
    return types.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
  };

  const basicSearch = <SearchBar type={formik.values.type} />;

  const advancedSearch = (
    <form className="advanced-search-form" onSubmit={formik.handleSubmit}>
      <span>
        <label className="bold" htmlFor="name">
          name:
        </label>
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></input>
      </span>
      <span>
        <label className="bold" htmlFor="status">
          status:
        </label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option value="needsHome">looking for a home</option>
          <option value="fostered">in foster care</option>
          <option value="adopted">has a home</option>
        </select>
      </span>
      <span>
        <label className="bold" htmlFor="height">
          height:
        </label>
        <fieldset id="height" name="height">
          <label htmlFor="minHeight">from</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.minHeight}
            className="num"
            id="minHeight"
            name="minHeight"
            type="number"
          />
          <p>cm</p>
          <label htmlFor="maxHeight">to</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.maxHeight}
            className="num"
            id="maxHeight"
            name="maxHeight"
            type="number"
          />
          <p>cm</p>
        </fieldset>
      </span>
      <span>
        <label className="bold" htmlFor="weight">
          weight:
        </label>
        <fieldset id="weight">
          <label htmlFor="minWeight">from</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.minWeight}
            className="num"
            id="minWeight"
            name="minWeight"
            type="number"
          />
          <p>kg</p>
          <label htmlFor="maxWeight">to</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.maxWeight}
            className="num"
            id="maxWeight"
            name="maxWeight"
            type="number"
          />
          <p>kg</p>
        </fieldset>
      </span>
      <span>
        <label className="bold" htmlFor="type">
          type:
        </label>
        <select
          id="type"
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
        >
          {animalTypesToOptions()}
        </select>
      </span>
      <input type="submit" className="submit" value="search" />
    </form>
  );

  return (
    <div className="main-section">
      <h1>{isAdvanced ? "Advanced Search" : "Basic Search"}</h1>
      {isAdvanced ? advancedSearch : basicSearch}
      {toggle}
    </div>
  );
}

export default SearchPage;
