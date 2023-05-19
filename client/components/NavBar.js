import { useState, useContext } from "react";
import { Menu } from "antd";
import { Context } from "../context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";
import Link from "next/link";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  FileAddFilled,
  FundProjectionScreenOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import { CiStreamOn } from "react-icons/ci";
import { MdLightMode, MdDarkMode } from "react-icons/md";



const { Item, SubMenu, ItemGroup } = Menu;

const NavBar = () => {
  const [current, setCurrent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };
  const changeBgColor = () => {
    const color = isDarkMode ? "rgb(245 243 255)" : "rgb(17 24 39)";
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = color;
  };

  return (
    <div className="mx-auto flex justify-center ">
      <div className="container flex flex-col lg:flex-row py-2 justify-between items-center">
        <a href={"/"}>
          <img
            className="object-scale-down h-15 w-60"
            src="/assets/logo.png"
            alt="logo"
          />
        </a>
        <div className="flex items-center gap-4">
          {user === null && (
            <>
              <p className="text-base font-medium cursor-pointer">
                <Link href={"/login"}>Sign In</Link>
              </p>
              <p className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm">
                <Link href={"/register"}>Create Free Account</Link>
              </p>
            </>
          )}
          {user !== null &&
            (user && user.role && user.role.includes("Instructor") ? (
              <>
                <Menu className=" bg-transparent">
                  <Item
                    className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm"
                    icon={<VideoCameraFilled />}
                  >
                    <Link href={"/instructor/CreateRoom"}>Go live</Link>
                  </Item>
                </Menu>
                <Menu className=" bg-transparent">
                  <Item
                    className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm"
                    key="/instructor/course/create"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<FileAddFilled />}
                  >
                    <Link href={"/instructor/course/create"}>
                      Create course
                    </Link>
                  </Item>
                </Menu>
              </>
            ) : (
              <>
                <Menu className=" bg-transparent">
                  <Item
                    className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm"
                    key="/user/become-instructor"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<FundProjectionScreenOutlined />}
                  >
                    <Link href={"/user/become-instructor"}>
                      Become Instuctor
                    </Link>
                  </Item>
                </Menu>
                <Menu className=" bg-transparent">
                  <Item
                    className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm"
                    key="/user/become-instructor"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<CiStreamOn />}
                  >
                    <Link href={"/user/JoinRoom"}>Join Room</Link>
                  </Item>
                </Menu>
              </>
            ))}

          {user !== null && (
            <Menu
              mode="vertical"
              style={{ direction: "ltr" }}
              className=" bg-transparent"
            >
              <SubMenu
                title={user && user.name}
                className="ant-dropdown-submenu float-right cursor-pointer "
                icon={<MenuOutlined />}
                popupPlacement="leftTop"
                popupOffset={[-155, 45]}
              >
                <ItemGroup>
                  <Item
                    key="/user"
                    className="text-base font-medium cursor-pointer"
                    icon={<UserOutlined />}
                  >
                    <Link href={"/user"}>Profile</Link>
                  </Item>

                  {user && user.role && user.role.includes("Instructor") && (
                    <Item
                      key="/instructor"
                      className="text-base font-medium cursor-pointer"
                      onClick={(e) => setCurrent(e.key)}
                      icon={<FundProjectionScreenOutlined />}
                    >
                      <Link href="/instructor">Instructor</Link>
                    </Item>
                  )}
                  <Item
                    onClick={logout}
                    className="text-base font-medium cursor-pointer"
                    icon={<LogoutOutlined />}
                  >
                    Sign out
                  </Item>
                </ItemGroup>
              </SubMenu>
            </Menu>
          )}
          <button
            className="text-base font-medium capitalize bg-purple-500 border border-none cursor-pointer btn btn-sm"
            onClick={changeBgColor}
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
