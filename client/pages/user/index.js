
import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { useState } from "react";
import { Avatar} from 'antd';
import axios from "axios";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const {
    name,
    email,
    picture,
  } = values;

  
  return (
    <UserRoute>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <Avatar src="/assets/course.png" className=" w-16 h-16 mr-4"/>
          <div>
            <p className="text-lg font-medium text-white">{email}</p>        
            <p className="text-gray-100 ">{user?.role?.join(" and ")}</p>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
