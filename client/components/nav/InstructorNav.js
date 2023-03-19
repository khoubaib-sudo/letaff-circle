import Link from "next/link";

const InstructorNav = () => {
  return (
    <div>
      <Link className="nav-link active" href="/instructor">
        Dashboard
      </Link>
      <Link className="nav-link active" href="/instructor/course/create">
        Create Crourse
      </Link>
    </div>
  );
};

export default InstructorNav;
