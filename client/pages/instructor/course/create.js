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

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
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
