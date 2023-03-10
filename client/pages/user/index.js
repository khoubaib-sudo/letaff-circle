import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="text-center square">User dashboard</h1>
    </UserRoute>
  );
};

export default UserIndex;

// import { useContext } from "react";
// import { Context } from "../../context";
// import UserRoute from "../../components/routes/UserRoute";
// import { useState } from "react";
// import axios from "axios";

// const UserIndex = () => {
//   const {
//     state: { user },
//   } = useContext(Context);
//   const [values, setValues] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     password: "",
//     confirmPassword: "",
//     picture: user?.picture || "",
//     buttonText: "Submit",
//     success: "",
//     error: "",
//   });

//   const {
//     name,
//     email,
//     password,
//     confirmPassword,
//     picture,
//     buttonText,
//     success,
//     error,
//   } = values;

//   const handleChange = (name) => (e) => {
//     setValues({
//       ...values,
//       [name]: e.target.value,
//       error: "",
//       success: "",
//       buttonText: "Submit",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValues({ ...values, buttonText: "Submitting..." });

//     try {
//       const response = await axios.put(`/user`, {
//         name,
//         email,
//         password,
//         confirmPassword,
//         picture,
//       });
//       setValues({
//         ...values,
//         buttonText: "Submitted",
//         success: "Profile updated successfully",
//       });
//     } catch (error) {
//       console.log("from handleSubmit", error);
//       setValues({
//         ...values,
//         buttonText: "Submit",
//         error: error.response.data.error,
//       });
//     }
//   };
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <UserRoute>
//       <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Profile</h1>
//         <div className="flex items-center mb-4">
//           <img src={picture} className="rounded-full w-16 h-16 mr-4" />
//           <div>
//             <p className="text-lg font-medium">{email}</p>
//             <p className="text-gray-600">{user?.role?.join(", ")}</p>
//           </div>
//         </div>
//         {isEditing ? (
//           <form onSubmit={handleSubmit}>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={name}
//                   onChange={handleChange("name")}
//                   className="border-2 border-gray-300 p-2 w-full rounded-lg"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange("email")}
//                   className="border-2 border-gray-300 p-2 w-full rounded-lg"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange("password")}
//                   className="border-2 border-gray-300 p-2 w-full rounded-lg"
//                   placeholder="Enter your new password"
//                 />
//               </div>
//               <div className="form-group">
//                 <label
//                   htmlFor="password"
//                   className="block text-gray-700 font-bold mb-2"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   className="border-2 border-gray-300 p-2 w-full rounded-lg"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={handleChange("confirmPassword")}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 {isEditing ? "Save" : "Submit"}
//               </button>
//               {success && (
//                 <div className="alert alert-success mt-3">{success}</div>
//               )}
//               {error && <div className="alert alert-danger mt-3">{error}</div>}
//             </form>
//           </form>
//         ) : (
//           <div>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit
//             </button>
//           </div>
//         )}
//       </div>
//     </UserRoute>
//   );
// };

// export default UserIndex;
