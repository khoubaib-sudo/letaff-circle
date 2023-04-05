import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal } from "antd";
import { EditOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
const CourseView = () => {
  const [course, setCourse] = useState({});
  //for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload video");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  // functions for add lesson
  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleVideo = async (info) => {
    try {
        const { status, originFileObj } = info.file;
        if (status === "done") {
            setUploadButtonText(originFileObj.name);
            setUploading(true);
        }
        const videoData = new FormData();
        videoData.append("video", originFileObj);
        // send video as form data to backend
        const { data } = await axios.post("/api/course/video-upload", videoData);
        // once response is received
        console.log(data);
        setValues({ ...values, video: data });
        setUploading(false);
    } catch (err) {
        console.log(err);
        setUploading(false);
        toast.error("Video upload failed", { theme: "colored" });
    }
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
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
              />
            </Modal>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
