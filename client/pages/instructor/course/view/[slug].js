import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

import { TbEdit, TbCheckbox, TbCircleX, TbUsers } from "react-icons/tb";

import { RiQuestionLine } from "react-icons/ri";

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
  // student count
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    console.log("STUDENT COUNT => ", data);
    setStudents(data.length);
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
      setUploadButtonText("Upload video");
      setVisible(false);
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

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publsih your course, it will be live in the marketplace for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Congrats! Your course is live");
    } catch (err) {
      toast("Course publish failed. Try again");
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you unpublsih your course, it will no be available for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Your course is unpublished");
    } catch (err) {
      toast("Course publish failed. Try again");
    }
  };

  return (
    <InstructorRoute>
      <div className="flex flex-col justify-between items-center">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
            <div className="flex items-center p-6">
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
                    <h5 className="text-3xl text-white font-semibold">
                      {course.name}
                    </h5>
                    <p className="text-sm text-gray-50 ">
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p className="text-sm text-gray-50 mt-1">
                      {course.category}
                    </p>
                    <div className="flex flex-row">
                      <span
                        style={{
                          backgroundColor: "#6b21a8",
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontSize: "15px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        <TbUsers
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            marginRight: '4px'
                          }}
                        />
                         {`${students} Students Enrolled`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-row">
                      <Tooltip title="Edit">
                        <TbEdit
                          onClick={() =>
                            router.push(`/instructor/course/edit/${slug}`)
                          }
                          className="text-3xl cursor-pointer text-white"
                        />
                      </Tooltip>

                      {course.lessons && course.lessons.length < 5 ? (
                        <Tooltip title="Min 5 lessons required to publish">
                          <RiQuestionLine className="text-3xl cursor-pointer text-white" />
                        </Tooltip>
                      ) : course.published ? (
                        <Tooltip title="Unpublish">
                          <TbCircleX
                            onClick={(e) => handleUnpublish(e, course._id)}
                            className="text-3xl cursor-pointer text-white"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Publish">
                          <TbCheckbox
                            onClick={(e) => handlePublish(e, course._id)}
                            className="text-3xl cursor-pointer text-white"
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="mt-4 text-white pl-6">
              <ReactMarkdown children={course.description} />
            </div>
            <div className="row pl-6">
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
              open={visible}
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
                  You have uploaded{" "}
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {course &&
                    course.lessons &&
                    course.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="bg-purple-800 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
                      >
                        <div className="p-4 rounded-t-lg">
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
                        <div className="p-4 rounded-b-lg">
                          <span className="text-white">Lesson {index + 1}</span>
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
