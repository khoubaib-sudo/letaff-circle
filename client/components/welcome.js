import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "../components/cards/CourseCard";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchCourses();
  }, []);
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
    },
  };
  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <motion.div
          className="max-w-6xl mx-auto bg-purple-900 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="relative h-64 md:h-80 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/hero3.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <motion.div
              className="absolute inset-0 p-8 flex flex-col justify-end"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-5xl font-bold text-white">
                Welcome to Letaff
              </h1>
              <p className="text-lg text-white">
                Learn anything, anytime, anywhere with our online courses.
              </p>
            </motion.div>
            <motion.div
              className="absolute inset-0"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              
            </motion.div>
          </div>
          <motion.div
            className="p-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg text-white">
              Our courses are designed to help you acquire new skills and
              knowledge, advance your career, and achieve your goals.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
            className="p-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
        <div className="container-fluid flex-grow">
          <div className="grid grid-cols-3 row justify-center gap-10 px-5 py-10">
            {courses.map((course) => (
              <div className="w-full max-w-sm">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
