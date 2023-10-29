import { useEffect, useState } from "react";
import styles from "./CrudOperations.module.css";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  createMovie,
  getAllMovies,
  removeMovie,
  editMovie as alterMovie,
} from "./MoviesCrud";

// schema/structure for movie validation
const moviesSchema = yup.object().shape({
  id: yup.number(),
  title: yup
    .string()
    .min(2, "Minimum 2 characters required")
    .max(50, "Maximum 50 characters allowed")
    .required(),
  imageUrl: yup.string().url("Please check the image url").required(),
  language: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .max(10, "Maximum 10 characters allowed")
    .required(),
  lead: yup
    .string()
    .min(2, "Minimum 2 characters required")
    .max(50, "Maximum 50 characters allowed")
    .required(),
});

const initialState = {
  title: "",
  language: "",
  lead: "",
  imageUrl: "",
};

const MovieCard = ({
  id,
  title,
  lead,
  imageUrl,
  language,
  deleteMovie,
  handleEdit,
}) => {
  return (
    <div style={{ border: "1px solid", margin: 8, textAlign: "center" }}>
      <img
        src={imageUrl}
        alt={title}
        style={{ height: 200, width: 150, objectFit: "contain" }}
      />
      <h4>{title}</h4>
      <h5>{lead}</h5>
      <h5>{language}</h5>
      <button onClick={() => deleteMovie(id)}>Remove</button>&nbsp;
      <button onClick={() => handleEdit(id)}>Edit</button>
      <br />
      <br />
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

const CrudOperations = () => {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);

  // hooks can only be used inside the component
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: moviesSchema,
    onSubmit: async (values, { resetForm }) => {
      if (editMovie) {
        const reponseJson = await alterMovie(values, editMovie);
        const editIndex = movies.findIndex((m) => m.id === editMovie);
        const tempMovies = [...movies];

        tempMovies[editIndex] = reponseJson;
        setMovies(tempMovies);
      } else {
        const reponseJson = await createMovie(values);
        setMovies([...movies, reponseJson]);
      }
      resetForm();
    },
  });

  const loadMovies = async () => {
    setMovies(await getAllMovies());
  };

  const handleEdit = (movieId) => {
    formik.setValues(movies.find((m) => m.id === movieId));
    setEditMovie(movieId);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className={styles["container"]}>
      {console.log("errors", formik.errors)}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.title && formik.errors.title && (
          <span>{formik.errors.title}</span>
        )}
        <br />
        <label htmlFor="language">Language</label>
        <br />
        <input
          type="text"
          name="language"
          id="language"
          value={formik.values.language}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.language && formik.errors.language && (
          <span>{formik.errors.language}</span>
        )}
        <br />
        <label htmlFor="lead">Lead Actor</label>
        <br />
        <input
          type="text"
          name="lead"
          id="lead"
          value={formik.values.lead}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.lead && formik.errors.lead && (
          <span>{formik.errors.lead}</span>
        )}
        <br />
        <label htmlFor="imageUrl">Image Link</label>
        <br />
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.imageUrl && formik.errors.imageUrl && (
          <span>{formik.errors.imageUrl}</span>
        )}
        <br />
        <br />
        <input type="submit" />
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: 48,
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            deleteMovie={() => undefined}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default CrudOperations;
