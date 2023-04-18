import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Badge, Button , Modal} from "antd";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  // destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto">
      <motion.div
        className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8 flex"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <div>
            {/* title */}
            <h1 className="text-3xl text-white font-semibold mb-4">{name}</h1>
            {/* description */}
            <p className="text-gray-50 mb-4">
              {description && description.substring(0, 160)}...
            </p>
            {/* category */}
            <Badge
              count={category}
              style={{ backgroundColor: "#a855f7" }}
              className="pb-4 mr-2"
            />
            {/* author */}
            <p className="text-gray-50">Created by {instructor.name}</p>
            {/* updated at */}
            <p className="text-gray-50">
              Last updated {new Date(updatedAt).toLocaleDateString()}
            </p>
            {/* price */}
            <h4 className="text-2xl font-semibold mt-4">
              {paid ? (
                <div className="font-semibold">${price.toFixed(2)}</div>
              ) : (
                <div className="font-semibold">Free</div>
              )}
            </h4>
            {/* enroll button */}
            <Button className="mt-6">Enroll</Button>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          {/* show course image and video preview */}
          {lessons[0].video && lessons[0].video.url ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.url);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.url}
                light={course.image.secure_url}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <div>
              <img
                src={course.image.secure_url}
                alt={name}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </motion.div>
      {showModal ? course.lessons[0].video.url : "don't show"}
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
