import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseView from "../../components/cards/SingleCourseView";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { motion } from "framer-motion";

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="container mx-auto">
      <motion.div
        className="mx-auto bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <SingleCourseView
          course={course}
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
          setPreview={setPreview}
        />
        <PreviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
        />
        {course.lessons && (
          <SingleCourseLessons
            lessons={course.lessons}
            setPreview={setPreview}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </motion.div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
