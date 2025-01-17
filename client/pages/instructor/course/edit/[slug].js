import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FiEdit3 } from "react-icons/fi";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lesson: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  // state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
    "Upload another Video"
  );
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image upload failed. Try later.");
      }
    });
  };
  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", {
        public_id: image.public_id,
      });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false, public_id: "" });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Image removal failed", { theme: "colored" });
    }
  };
  const handleCategoryChange = (value) => {
    setValues({ ...values, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast.success("course updated", {
        theme: "colored",
      });
      // router.push("/instructor");
    } catch (err) {
      toast.error(err.response.data, {
        theme: "colored",
      });
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, lessons: [...allLessons] });
    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    // console.log("LESSONS REARRANGED RES => ", data);
    toast("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setValues({ ...values, lessons: allLessons });
    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  /**
   * lesson update functions
   */

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
        if (values && values.video) {
          await handleVideoRemove(); // remove the old video
        }
        setValues({ ...values, video: data });
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video upload failed", { theme: "colored" });
    }
  };

  const handleUpdateLesson = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);
    // update ui
    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast("Lesson updated");
    }
  };

  return (
    <InstructorRoute>
      <div className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2 md:mr-auto ml-auto">
            <h1 className="text-4xl md:text-7xl capitalize font-semibold">
              Edit <FiEdit3 className="inline-block mr-2 text-white" />
              <br />
              <span className="capitalize text-white">Course</span>
            </h1>
            <div className="mt-5">
              <CourseCreateForm
                handleSubmit={handleSubmit}
                handleImage={handleImage}
                handleChange={handleChange}
                values={values}
                setValues={setValues}
                preview={preview}
                uploadButtonText={uploadButtonText}
                handleImageRemove={handleImageRemove}
                handleCategoryChange={handleCategoryChange}
                editPage={true}
              />
            </div>
          </div>
          <div className="md:w-full md:ml-20">
            <img
              src="/assets/edit-course.png"
              alt="Example image"
              className="mx-auto md:mb-10 md:w-120 animate-float"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between items-center bg-purple-800 rounded-lg shadow-md p-10 ">
          <div className="w-full px-4 mb-4 md:mb-0">
            <h4 className="text-2xl text-white font-bold mb-4">
              You can edit your lessons in this section
              <p className="text-sm text-gray-100 ">
                you can drag and drop to rearrange lessons
              </p>
            </h4>
            <div
              onDragOver={(e) => e.preventDefault()}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {values &&
                values.lessons &&
                values.lessons.map((lesson, index) => (
                  <div
                    draggable
                    onDragStart={(e) => handleDrag(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    key={index}
                    className="bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <h5 className="text-lg font-bold mb-2">{lesson.title}</h5>
                      <EditOutlined
                        className="text-gray-500 hover:text-purple-500 "
                        onClick={() => {
                          setVisible(true);
                          setCurrent(lesson);
                        }}
                        style={{ fontSize: "1.1rem" }}
                      />
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
                    <div className="p-4 flex justify-between items-center rounded-b-lg">
                      <span className="text-black-700">Lesson {index + 1}</span>
                      <DeleteOutlined
                        onClick={() => handleDelete(index)}
                        className="text-gray-500 hover:text-red-500 "
                        style={{ fontSize: "1.1rem" }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Update lesson"
        centered
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre>  */}
      </Modal>
    </InstructorRoute>
  );
};

export default CourseEdit;
