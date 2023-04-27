import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { Avatar } from "antd";
import axios from "axios";
import Link from "next/link";
import { SyncOutlined, PlayCircleFilled } from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";
const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="flex justify-center items-center text-purple-500 text-5xl p-10"
        />
      )}
      <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <Avatar
            src="https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?w=826&t=st=1682603332~exp=1682603932~hmac=74084fbe09a707df9af349f0fe4d1aadc24682f3cd0200fff75d46ddf5e52cdb"
            className="w-20 h-20 mr-4 border-4 border-purple-200 rounded-full shadow-lg"
          />
          <div>
            <p className="text-3xl font-bold text-white mb-1">{user?.name}</p>
            <p className="text-gray-100 text-lg font-medium">
              {user?.role?.join(" and ")}
            </p>
          </div>
        </div>
        <div className="bg-purple-900 rounded-lg shadow-md p-8">
          <h2 className="text-white text-3xl font-bold mb-4">
            List of your courses:
          </h2>
          {courses &&
            courses.map((course) => (
              <div
                key={course._id}
                className="flex items-center border-b border-gray-50 py-4"
              >
                <Avatar
                  size={100}
                  shape="square"
                  src={course.image ? course.image.url : "/course.png"}
                  className="mr-4 rounded-lg shadow-lg"
                />

                <div className="flex-grow">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <h5 className="text-2xl font-bold text-white">
                      {course.name}
                    </h5>
                  </Link>
                  <p className="text-sm text-gray-50 my-1">
                    {course.lessons.length} lessons
                  </p>
                  <p className="text-sm text-gray-50 my-1">
                    By {course.instructor.name}
                  </p>
                </div>

                <div className="flex-shrink-0 ml-4">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="flex items-center justify-center rounded-full w-12 h-12"
                  >
                    <FaPlay className="text-white text-3xl" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
    </UserRoute>
  );
};

export default UserIndex;
