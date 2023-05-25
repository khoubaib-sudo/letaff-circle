import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { Avatar, Form, Input, Button, Upload } from "antd";
import axios from "axios";
import Link from "next/link";
import { SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Resizer from "react-image-file-resizer";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  // Handle the Image Upload

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cardVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="flex justify-center items-center text-purple-500 text-5xl p-10"
        />
      )}
      <motion.div
        className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8"
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-4">
          <motion.div
            variants={cardVariants}
            className="flex flex-col justify-center"
          >
            <Avatar
              src="{avatar}"
              className="w-20 h-20 mr-4 border-4 border-purple-200 rounded-full shadow-lg"
            />
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="flex flex-col justify-center"
          >
            <motion.p className="text-3xl font-bold text-white mb-1">
              {user?.name}
            </motion.p>
            <motion.p className="text-gray-100 text-lg font-medium">
              {user?.role?.join(" and ")}
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-900 rounded-lg shadow-md p-8"
        >
          <h2 className="text-white text-3xl font-bold mb-4">
            List of your courses:
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="relative">
                  <Link href={`/user/course/${course.slug}`}>
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      src={course.image ? course.image.url : "/course.png"}
                      alt="course image"
                      className=" rounded-lg shadow-lg h-64 w-full object-cover"
                    />
                  </Link>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-0 right-0 bg-purple-500 text-white font-bold px-4 py-1 rounded-tl-lg"
                  >
                    {course.lessons.length} lessons
                  </motion.div>
                </div>

                <div className="mt-4">
                  <Link href={`/user/course/${course.slug}`}>
                    <motion.h5
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl font-bold text-purple-900 hover:text-purple-700"
                    >
                      {course.name}
                    </motion.h5>
                  </Link>

                  <p className="text-gray-500 text-sm mt-1">
                    By {course.instructor.name}
                  </p>
                </div>

                <Link
                  className="inline-block mt-4 px-4 py-2 rounded-md text-white font-bold bg-purple-600 hover:bg-purple-500"
                  href={`/user/course/${course.slug}`}
                >
                  Start Learning
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </UserRoute>
  );
};

export default UserIndex;
