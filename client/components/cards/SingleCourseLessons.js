import { List, Avatar } from "antd";
const { Item } = List;
import { motion } from "framer-motion";

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-between items-cente p-8">
        <div className="flex">
          <div className="flex-1 lesson-list">
            
            <List
              itemLayout="horizontal"
              dataSource={lessons}
              renderItem={(item, index) => (
                <Item className="flex items-center text-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                  <Item.Meta
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={<span className="text-lg text-white">{item.title}</span>}
                  />
                </Item>
              )}
              className="relative"
              style={{
                background: "rgba(11, 0, 20, 0.30)", // Set background color with opacity
                backdropFilter: "blur(10px)", // Add backdrop filter for blur effect
                borderRadius: "8px", // Add border radius
                padding: "16px", // Add padding
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
