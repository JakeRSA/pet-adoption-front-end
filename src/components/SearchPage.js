import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SearchBar from "./SearchBar";
import "../styles/SearchPage.css";
import PetCardList from "./PetCardList";
import { useLocation } from "react-router-dom";

function SearchPage() {
  let queryString = useLocation().search;
  const [isAdvanced, setisAdvanced] = useState(
    queryString.search("advanced") > 0
  );
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
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

  const onBasicSubmit = (values) => {
    setLoading(true);
    axios.get(baseServerUrl + `/pet?type=${values.type}`).then((res) => {
      setResults(res.data);
      setHasSearched(true);
      setLoading(false);
    });
  };

  const handleToggleAdvanced = async () => {
    setHasSearched(false);
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

  const numberInputOnly = (event, formikProps) => {
    event.preventDefault();
    const { value } = event.target;
    const regex = /^\d+$/;
    if (!value || regex.test(value.toString())) {
      formikProps.setFieldValue(event.target.name, value);
    }
  };

  const basicSearch = (
    <SearchBar
      onSubmit={(values) => {
        onBasicSubmit(values);
      }}
    />
  );

  const advancedSearch = (
    <Formik
      initialValues={{
        name: "",
        status: "",
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        type: "",
      }}
      onSubmit={(values) => {
        setLoading(true);
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
          setHasSearched(true);
          setLoading(false);
        });
      }}
    >
      {(props) => (
        <Form className="advanced-search-form">
          <span>
            <label className="bold" htmlFor="name">
              name:
            </label>
            <Field id="name" name="name" />
          </span>
          <span>
            <label className="bold" htmlFor="status">
              status:
            </label>
            <Field as="select" id="status" name="status">
              <option value="">any</option>
              <option value="available">looking for a home</option>
              <option value="fostered">in foster care</option>
              <option value="has owner">has a home</option>
            </Field>
          </span>
          <span>
            <label className="bold" htmlFor="height">
              height:
            </label>
            <fieldset id="height" name="height">
              <label htmlFor="minHeight">from</label>
              <Field
                className="num"
                id="minHeight"
                name="minHeight"
                type="number"
                min={0}
                onChange={(e) => {
                  numberInputOnly(e, props);
                }}
              />
              <p>cm</p>
              <label htmlFor="maxHeight">to</label>
              <Field
                className="num"
                id="maxHeight"
                name="maxHeight"
                type="number"
                min={0}
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
              <Field
                className="num"
                id="minWeight"
                name="minWeight"
                type="number"
                min={0}
              />
              <p>kg</p>
              <label htmlFor="maxWeight">to</label>
              <Field
                className="num"
                id="maxWeight"
                name="maxWeight"
                type="number"
                min={0}
              />
              <p>kg</p>
            </fieldset>
          </span>
          <span>
            <label className="bold" htmlFor="type">
              type:
            </label>
            <Field as="select" id="type" name="type">
              <option value="">any</option>
              {animalTypeOptions}
            </Field>
          </span>
          <button type="submit" className="submit" value="search" />
        </Form>
      )}
    </Formik>
  );
  return (
    <div className="main-section">
      <h1>{isAdvanced ? "Advanced Search" : "Basic Search"}</h1>
      {isAdvanced ? advancedSearch : basicSearch}
      {toggle}
      {!loading && results.length > 0 ? (
        <PetCardList pets={results} />
      ) : (
        hasSearched && (
          <h4 className="no-results">your search returned 0 results</h4>
        )
      )}
    </div>
  );
}

export default SearchPage;
