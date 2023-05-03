import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";

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
        <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
          <div className="w-60">
            <Menu
              defaultSelectedKeys={[clicked]}
              inlineCollapsed={collapsed}
              className=" text-white rounded-lg "
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
                  <span className="ml-1 font-medium">
                    {lesson.title.substring(0, 30)}
                  </span>
                </Item>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
