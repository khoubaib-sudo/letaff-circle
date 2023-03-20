import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  //state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const CourseCreateForm = () => {
    <form onSubmit={handleSubmit} className="form-group">
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleSubmit}
        />
      </div>
    </form>;
  };

  return (
    <InstructorRoute>
      <h1 className="text-center">Create Course</h1>
      <div className="pt-3 pb-3">{CourseCreateForm()}</div>
    </InstructorRoute>
  );
};

export default CourseCreate;
