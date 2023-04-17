import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <Card
        className="mb-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
        cover={
          <img
            src={course.image ? course.image.secure_url : "/assets/course.png"}
            alt={name}
            className="h-64 w-full object-cover"
          />
        }   
      >
        <Meta
          title={name}
          description={`by ${instructor.name}`}
          className="font-bold text-l mt-2 p-2"
        />
        <div className="flex justify-between items-center">
          <Badge
            count={category}
            style={{ backgroundColor: "#a855f7" }}
            className="mr-2"
          />
          {paid ? (
            <div className=" font-semibold">
              ${price.toFixed(2)}
            </div>
          ) : (
            <div className="font-semibold">Free</div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
