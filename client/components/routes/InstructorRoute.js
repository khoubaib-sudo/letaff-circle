import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Menu } from "antd";

const { Item, SubMenu, ItemGroup } = Menu;
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
            <Menu mode="inline" style={{ width: 250 }}>
              <ItemGroup>
                <Item
                  className="text-base font-medium cursor-pointer bg-purple-500"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    className={`nav-link ${
                      current === "/instructor" && "active"
                    }` }
                    href="/instructor"
                    style={{ color: "#fff" }}
                  >
                    Dashboard
                  </Link>
                </Item>
                <Item
                  className="text-base font-medium cursor-pointer bg-purple-500"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    className={`nav-link ${
                      current === "/instructor/course/create" && "active"
                    }`}
                    href="/instructor/course/create"
                    style={{ color: "#fff" }}
                  >
                    Create Course
                  </Link>
                </Item>
              </ItemGroup>
            </Menu>
            <div className="flex-grow">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
