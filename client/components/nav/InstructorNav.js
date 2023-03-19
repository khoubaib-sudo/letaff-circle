import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
    const [currentn, setCurrent] = useState('')
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

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
