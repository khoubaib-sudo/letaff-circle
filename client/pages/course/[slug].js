import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Badge, Button } from "antd";
import { motion } from "framer-motion";

const SingleCourse = ({ course }) => {
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
        className="bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
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
          
        </div>
        <div className="col-md-4">
          <p>show course image</p>
          <p>show enroll button</p>
          
        </div>
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
