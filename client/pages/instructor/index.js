import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar , Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "15px", fontSize: "18px" };

  return (
    <InstructorRoute>
      <div className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl md:text-7xl capitalize font-semibold">
          Instructor&nbsp;
          <span className="text-white capitalize">Dashboard</span>
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {courses &&
            courses.map((course) => (
              <div
                key={course._id}
                className=" bg-purple-100 max-w-xl rounded-lg shadow-lg overflow-hidden mb-8"
              >
                <div className="flex items-center p-4">
                  <Avatar
                    size={120}
                    shape="square"
                    src={
                      course.image
                        ? course.image.secure_url
                        : "/assets/course.png"
                    }
                  />

                  <div className="flex-grow pl-4">
                    <Link
                      className="text-lg mt-2 cursor-pointer font-semibold hover:underline"
                      href={`/instructor/course/view/${course.slug}`}
                    >
                      {course.name}
                    </Link>
                    <p style={{ marginTop: "-8px" }}>
                      {course.lessons.length} Lessons
                    </p>
                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-purple-500 ">
                        At least 5 lessons are required to publish
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-purple-500 ">
                        Your course is in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-purple-500 ">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mb-20 text-center">
                    {course.published ? (
                      <div>
                        <Tooltip title="Published">
                        <CheckCircleOutlined className="text-success" />
                        </Tooltip>
                      </div>
                    ) : (
                      <div>
                        <Tooltip title="Unpublished">
                        <ExclamationCircleOutlined className="text-purple-500 " />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
