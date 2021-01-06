import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import { useFormik } from "formik";
import SearchBar from "./SearchBar";
import "../styles/SearchPage.css";
import PetCardList from "./PetCardList";
import { useLocation } from "react-router-dom";

function SearchPage(props) {
  let queryString = useLocation().search;
  const [isAdvanced, setisAdvanced] = useState(
    queryString.search("advanced") > 0
  );
  const [results, setResults] = useState([]);
  const baseServerUrl = useContext(ServerContext);
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
      let queryString = "";
      if (values.name)
        queryString += `name=${values.name.split(" ").join("+")}&`;
      if (values.status) queryString += `status=${values.status}&`;
      if (values.minHeight) queryString += `minHeight=${values.minHeight}&`;
      if (values.maxHeight) queryString += `maxHeight=${values.maxHeight}&`;
      if (values.minWeight) queryString += `minWeight=${values.minWeight}&`;
      if (values.maxWeight) queryString += `maxWeight=${values.maxWeight}&`;
      if (values.type) queryString += `type=${values.type}&`;
      axios.get(baseServerUrl + `/pet?${queryString}`).then((res) => {
        setResults(res.data);
      });
    },
  });

  const onBasicSubmit = (values) => {
    axios.get(baseServerUrl + `/pet?type=${values.type}`).then((res) => {
      setResults(res.data);
    });
  };

  const handleToggleAdvanced = async () => {
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

  const basicSearch = (
    <SearchBar
      type={formik.values.type}
      onSubmit={(values) => {
        onBasicSubmit(values);
      }}
    />
  );

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
          <option value="">any</option>
          <option value="available">looking for a home</option>
          <option value="fostered">in foster care</option>
          <option value="has owner">has a home</option>
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
          <option value="">any</option>
          {animalTypeOptions}
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
      <PetCardList pets={results} />
    </div>
  );
}

export default SearchPage;
