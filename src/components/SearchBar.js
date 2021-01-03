import React from "react";
import { useFormik } from "formik";
import "../styles/SearchBar.css";

function SearchBar(props) {

  const formik = useFormik({
    initialValues: {
      type: props.type ? props.type : "",
    },
    onSubmit: (values) => {
      props.onSubmit(values)
    },
  });
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
