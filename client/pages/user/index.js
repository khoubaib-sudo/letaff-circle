import { useContext , useEffect , useState} from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { Avatar } from "antd";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    loadCourses()
  },[])
  
  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      
    } catch (err) {
      console.log(err);
      
    }
  };
  return (
    <UserRoute>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <Avatar
            src="https://mintspace-media.fra1.digitaloceanspaces.com/wp-content/uploads/2022/05/09170332/unnamed-2.png"
            className="w-20 h-20 mr-4 border-4 border-purple-200 rounded-full shadow-lg"
          />
          <div>
            <p className="text-3xl font-medium text-white mb-1">{user?.name}</p>
            <p className="text-gray-100 text-lg font-medium">
              {user?.role?.join(" and ")}
            </p>
          </div>
        </div>
        
      </div>
      <pre>{JSON.stringify(courses, null, 4)}</pre>
    </UserRoute>
  );
};

export default UserIndex;
