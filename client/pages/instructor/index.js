import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  return (
    <InstructorRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <h1 className="text-4xl md:text-7xl capitalize font-semibold">
          Instructor&nbsp;
          <span className="text-purple-500 capitalize">Deshbord</span>
        </h1>
      </div>

      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={120}
                shape="square"
                src={
                  course.image ? course.image.secure_url : "/assets/course.png"
                }
              />
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
