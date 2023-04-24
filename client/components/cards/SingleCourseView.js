import { Badge, Button, Modal } from "antd";

import ReactPlayer from "react-player";
import { LoadingOutlined } from "@ant-design/icons";

const SingleCourseView = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
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
  return (
    <div className="container mx-auto">
      <div className="max-w-6xl mx-auto p-6 pt-12 flex">
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
            {loading ? (
              <div className=" w-64 flex justify-center">
                <LoadingOutlined className="h1" />
              </div>
            ) : (
              <Button
                className=" w-64 flex justify-center mt-6 text-gray-50"
                shape="round"
                size="large"
                disabled={loading}
                onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
              >
                {user
                  ? enrolled.status
                    ? "Go to course"
                    : "Enroll"
                  : "Login to enroll"}
              </Button>
            )}
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
                light={image.url}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <div>
              <img src={image.url} alt={name} className="w-full h-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseView;
