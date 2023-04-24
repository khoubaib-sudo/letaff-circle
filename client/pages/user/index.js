import React, { useContext, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { Avatar, Input, Button } from "antd";
import axios from "axios";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    picture: user?.picture || "",
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const { name, email, picture } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send updated user information to the backend
    const res = await axios.put("/api/user", values);

    // Handle response and perform necessary actions, such as showing success message
    // or updating user information in the state
  };
  const handleAvatarUpload = async (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    
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
  return (
    <UserRoute>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <Avatar src={picture} className="w-16 h-16 mr-4" />
          <div>
            <p className="text-lg font-medium text-white">{email}</p>
            <p className="text-gray-100">{user?.role?.join(" and ")}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-4"
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4"
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="mb-4"
          />
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
