import { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";

const { Item } = Menu;
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  return (
    <StudentRoute>
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8 flex">
          <div className="w-60 mr-8 ">
            <Button
              className="text-white mt-1 btn-block mb-2"
            > Lessons
            </Button>
            <Menu
              defaultSelectedKeys={[clicked]}
              inlineCollapsed={collapsed}
              className="text-white "
              style={{
                background: "rgba(11, 0, 20, 0.30)", // Set background color with opacity
                backdropFilter: "blur(10px)", // Add backdrop filter for blur effect
                borderRadius: "8px", // Add border radius
                padding: "16px", // Add padding
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                height: "80vh",
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
                  </span>
                </Item>
              ))}
            </Menu>
          </div>

          <div className="col">
            {clicked !== -1 ? (
              <>
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
          </div>
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
