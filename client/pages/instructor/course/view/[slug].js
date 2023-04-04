import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal } from "antd";
import { EditOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [course, setCourse] = useState({});
  //for lessons
  const [visible, setVisible] = useState(false);
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
      <div className="container mx-auto px-4 py-3">
        {course && (
          <div className="bg-slate-100 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Avatar
                size={150}
                shape="square"
                src={
                  course.image ? course.image.secure_url : "/assets/course.png"
                }
              />

              <div className="flex-grow pl-6">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <h5 className="text-3xl font-semibold">{course.name}</h5>
                    <p className="text-sm text-gray-500 mt-1">
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {course.category}
                    </p>
                  </div>

                  <div className="flex pt-4 items-center">
                    <div className="flex flex-col">
                      <Tooltip title="Edit">
                        <EditOutlined className="text-2xl cursor-pointer" />
                      </Tooltip>
                      <Tooltip title="Publish">
                        <CheckOutlined className="text-2xl cursor-pointer" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="mt-4">
              <ReactMarkdown children={course.description} />
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="bg-purple-500 text-white flex items-center"
                type="primary"
                size="large"
                shape="round"
              >
                <PlusOutlined className="mr-1" />
                Add Lesson
              </Button>
            </div>
            <Modal
              title="Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              show add Lesson component
            </Modal>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
