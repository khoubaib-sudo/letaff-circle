import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [course, setCourse] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="flex pt-2">
              <Avatar
                size={150}
                shape="square"
                src={
                  course.image ? course.image.secure_url : "/assets/course.png"
                }
              />

              <div className="media-body pl-2">
                <div className="flex flex-row">
                  <div className="flex-grow">
                    <h5 className="mt-2">{course.name}</h5>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.category}
                    </p>
                  </div>

                  <div className="flex pt-4">
                    <Tooltip title="Edit">
                      <EditOutlined className="h-5 w-5 text-warning mr-4 cursor-pointer" />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h-5 w-5 text-danger cursor-pointer" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <ReactMarkdown children={course.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
