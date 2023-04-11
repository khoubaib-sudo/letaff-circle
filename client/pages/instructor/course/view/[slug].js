import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import Item from "antd/lib/list/Item";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

import { TbEdit, TbCheckbox } from "react-icons/tb";

const CourseView = () => {
  const [course, setCourse] = useState({});
  //for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload video");

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
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload video");
      setCourse(data);
      toast.success("Lesson added", { theme: "colored" });
    } catch (err) {
      console.log(err);
      toast.error("Lesson add failed", { theme: "colored" });
    }
  };

  const handleVideo = async (info) => {
    try {
      const { status, originFileObj } = info.file;
      if (status === "done" && !uploading) {
        setUploadButtonText(originFileObj.name);
        setUploading(true);
        const videoData = new FormData();
        videoData.append("video", originFileObj);
        // send video as form data to backend
        const { data } = await axios.post(
          `/api/course/video-upload/${course.instructor._id}`,
          videoData
        );
        // once response is received
        // console.log(data);
        setValues({ ...values, video: data });
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video upload failed", { theme: "colored" });
    }
  };

  const handleVideoRemove = async () => {
    // console.log('handle remove video')
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video remove failed", { theme: "colored" });
    }
  };

  return (
    <InstructorRoute>
      <div className="container mx-auto  py-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-6">
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
                    <h5 className="text-3xl text-white font-semibold">{course.name}</h5>
                    <p className="text-sm text-gray-50 mt-1">
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p className="text-sm text-gray-50 mt-1">
                      {course.category}
                    </p>
                  </div>

                  <div className="flex pt-4 items-center">
                    <div className="flex flex-col">
                      <Tooltip title="Edit">
                        <TbEdit
                          onClick={() =>
                            router.push(`/instructor/course/edit/${slug}`)
                          }
                          className="text-3xl cursor-pointer text-white"
                        />
                      </Tooltip>
                      <Tooltip title="Publish">
                        <TbCheckbox className="text-3xl cursor-pointer text-white" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="mt-4 text-white ">
              <ReactMarkdown children={course.description} />
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="bg-white text-purple-500 flex items-center"
                type="primary"
                size="large"
                shape="round"
              >
                <PlusOutlined className="mr-1 " />
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
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>
            <div className="flex flex-wrap pt-10">
              <div className="w-full px-4 mb-4 md:mb-0">
                <h4 className="text-2xl font-bold mb-4 text-white">
                  You have uploaded {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {course &&
                    course.lessons &&
                    course.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
                      >
                        <div className="p-4 bg-purple-800 rounded-t-lg">
                          <h5 className="text-lg text-white font-bold mb-2">
                            {lesson.title}
                          </h5>
                        </div>
                        <div>
                          {lesson && lesson.video && (
                            <ReactPlayer
                              url={lesson.video.url}
                              controls
                              width="100%"
                              height="100%"
                            />
                          )}
                        </div>
                        <div className="p-4 bg-purple-800 rounded-b-lg">
                          <span className="text-white">
                            Lesson {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
