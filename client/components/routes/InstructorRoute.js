import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import InstructorMenu from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <>
      {!ok ? (
        <LoadingOutlined
          spin
          style={{
            fontSize: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        />
      ) : (
        <div className="container mx-auto">
          <div className=" flex-col md:flex-row justify-between items-center">
            <InstructorMenu current={current} />
            <div className="flex-grow">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
