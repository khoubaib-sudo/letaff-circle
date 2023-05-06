import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Menu, message } from "antd";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);

  // force state update
  const [updateState, setUpdateState] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);

    // Check if all lessons are completed
    const lessonIds = course.lessons.map((lesson) => lesson._id);
    const areAllLessonsCompleted = lessonIds.every((lessonId) =>
      data.includes(lessonId)
    );
    setAllLessonsCompleted(areAllLessonsCompleted);
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);

    // Check if all lessons are completed after marking current lesson as completed
    const lessonIds = course.lessons.map((lesson) => lesson._id);
    const areAllLessonsCompleted = lessonIds.every((lessonId) =>
      [...completedLessons, course.lessons[clicked]._id].includes(lessonId)
    );
    setAllLessonsCompleted(areAllLessonsCompleted);

    // Show congratulatory message if all lessons are completed
    if (areAllLessonsCompleted) {
      message.success("Congratulations! You have completed all the lessons.");
    }
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StudentRoute>
      <div className="container mx-auto">
        <motion.div
          className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8 flex"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-50 mr-8">
            <div className="col bg-purple-800 text-white  font-bold rounded-lg p-4 mb-4">
              Lessons
            </div>
            <Menu
              className="text-white "
              style={{
                background: "rgba(11, 0, 20, 0.30)",
                backdropFilter: "blur(10px)",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                height: "80vh",
                width: "30vh",
              }}
            >
              {course.lessons.map((lesson, index) => (
                <Item
                  onClick={() => setClicked(index)}
                  key={index}
                  icon={<span className="text-gray-500 mr-2">{index + 1}</span>}
                >
                  <span className="ml-1 font-medium ">
                    {lesson.title.substring(0, 30)}
                    {completedLessons.includes(lesson._id) ? (
                      <CheckCircleFilled
                      className="float-right text-green-500 ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  ) : (
                    <MinusCircleFilled
                      className="float-right text-white ml-2"
                      style={{ marginTop: "13px" }}
                    />
                    )}
                  </span>
                </Item>
              ))}
            </Menu>
          </div>

          <motion.div
            className="col"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {allLessonsCompleted ? (
              <div className="flex justify-center ml-9  p-40">
                <div className="text-center p-5">
                  <img
                    src="/assets/hero4.png"
                    alt="Hero Image"
                    className="relative h-64 ml-24"
                  />
                  <p className="text-xl font-bold text-white inline-block">
                    Congratulations! You have completed the course.
                  </p>
                </div>
              </div>
            ) : clicked !== -1 ? (
              <>
                <div className="col bg-purple-200  font-bold rounded-lg p-4 mb-4">
                  <span>{course.lessons[clicked].title.substring(0, 30)}</span>
                  {completedLessons.includes(course.lessons[clicked]._id) ? (
                    <button
                      className="float-right   hover:text-purple-500"
                      onClick={markIncompleted}
                    >
                      Mark as incomplete
                    </button>
                  ) : (
                    <button
                      className="float-right   hover:text-purple-500"
                      onClick={markCompleted}
                    >
                      Mark as completed
                    </button>
                  )}
                </div>

                {course.lessons[clicked].video &&
                  course.lessons[clicked].video.url && (
                    <>
                      <div className="wrapper">
                        <ReactPlayer
                          className="player"
                          url={course.lessons[clicked].video.url}
                          width="100%"
                          height="580px"
                          controls
                          onEnded={() => markCompleted()}
                        />
                      </div>
                    </>
                  )}
                <div className="single-post mt-4 bg-purple-200 rounded-lg shadow-md p-8 flex">
                  {course.lessons[clicked].content}
                </div>
              </>
            ) : (
              <div className="flex justify-center ml-9  p-40">
                <div className="text-center p-5">
                  <FaPlay className="text-white text-5xl inline-block mr-4" />
                  <p className="text-xl font-bold text-white inline-block">
                    Click on the lessons to start learning
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
