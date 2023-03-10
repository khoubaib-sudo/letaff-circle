import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 bg-purple-500 p-5"
        />
      ) : (
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center py-10">
            <div
              className="bg-purple-500  text-white w-64 flex flex-col items-center"
              style={{ boxShadow: "5px 0px 5px rgba(0,0,0,0.2)" }}
            >
              <UserNav />
            </div>
            <div className="bg-gray-100 flex-grow p-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
