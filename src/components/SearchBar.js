import React, { useEffect } from "react";
import { useFormik } from "formik";
import "../styles/SearchBar.css";
import { useLocation } from "react-router-dom";

function SearchBar(props) {

  // convert url query string to object
  const queryString = useLocation().search;
  const params = queryString.slice(1, queryString.length).split("&");
  let paramObj = {};
  params.forEach((param) => {
    const keyVal = param.split("=");
    paramObj[keyVal[0]] = keyVal[1];
  });

  const formik = useFormik({
    initialValues: {
      type: paramObj.type ? paramObj.type : "",
    },
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  // applies to search bars not on the search page - props.onSubmit should be a redirect to the search page
  useEffect(() => {
    if (paramObj.type) {
      formik.handleSubmit();
    }
  }, []);

  return (
    <form className="search-bar" onSubmit={formik.handleSubmit}>
      <input
        className="search-term"
        id="type"
        name="type"
        type="text"
        placeholder="search by type..."
        onChange={formik.handleChange}
        value={formik.values.type}
      ></input>
      <input className="inline-search-btn" type="submit" value="search" />
    </form>
  );
}

export default SearchBar;
