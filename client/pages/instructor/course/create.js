import { useState } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");

  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  
  // router
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image upload failed. Try later.");
      }
    });
  };
  const handleCategoryChange = (value) => {
    setValues({ ...values, category: value });
  };
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", {
        public_id: image.public_id,
      });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false, public_id: "" });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Image removal failed", { theme: "colored" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post("/api/course", {
        ...values,
        image,
      });
      toast.success("Great! now you can start adding lessons",{theme: "colored",});
      router.push("/instructor");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <InstructorRoute>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="md:mr-auto ml-auto">
          <h1 className="text-4xl md:text-7xl capitalize font-semibold">
            Create
            <br />
            <span className="text-white capitalize">Course</span>
          </h1>
          <div className="mt-5">
            <CourseCreateForm
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadButtonText={uploadButtonText}
              handleImageRemove={handleImageRemove}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
        <img src="/assets/Create-Course.png" alt="Example image" className="mt-4 mx-auto md:ml-4 md:mt-0 md:max-w-none " />
      </div>

      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default CourseCreate;
