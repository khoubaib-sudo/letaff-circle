import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from '../../../components/forms/CourseCreateForm'



const CourseCreate = () => {
  //state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    imagePreview: "",
  });
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleImage = () => {
    //
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <InstructorRoute>
      <div
        style={{
          width: "50%",
          float: "left",
          paddingTop: "20px",
          paddingLeft: "360px",
        }}
      >
        <h1 className="text-7xl capitalize font-semibold">
          Create
          <br />
          <span className="text-purple-500 capitalize">Course</span>
        </h1>
        <pre>{JSON.stringify(values, null, 4)}</pre>
      </div>
      <div
        style={{ float: "right", paddingTop: "20px", paddingRight: "200px" }}
      >
        <CourseCreateForm 
        handleSubmit={handleSubmit} 
        handleImage={handleImage} 
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        />
      </div>
    </InstructorRoute>
  );
};

export default CourseCreate;
