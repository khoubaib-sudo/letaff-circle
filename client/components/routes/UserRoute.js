import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { Menu } from "antd";

const { Item, SubMenu, ItemGroup } = Menu;
const UserRoute = ({ children, showNav = true  }) => {
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
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Menu mode="inline" style={{ width: 180 }}>
              <ItemGroup>
                <Item
                  className="text-base font-medium cursor-pointer text-white bg-purple-500"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ margin: "0 auto" }}>
                    {showNav && <UserNav />}
                  </div>
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

export default UserRoute;
