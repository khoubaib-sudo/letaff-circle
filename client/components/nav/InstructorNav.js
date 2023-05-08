import { Menu } from "antd";
import Link from "next/link";
const { Item, ItemGroup } = Menu;
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbLayoutDashboard, TbFilePlus } from "react-icons/tb";

const InstructorNav = () => (
  <div className="flex">
    <div className="flex items-center  cursor-pointer text-white bg-purple-500 p-2 rounded-lg hover:bg-purple-600 transition-colors">
      <TbLayoutDashboard size={20} className="mr-2" />
      <Link href="/instructor">Dashboard</Link>
    </div>

    <div className="flex items-center  cursor-pointer text-white bg-purple-500 p-2 ml-2 rounded-lg hover:bg-purple-600 transition-colors">
      <TbFilePlus size={20} className="mr-2" />
      <Link href="/instructor/course/create">Create Course</Link>
    </div>

    <div className="flex items-center  cursor-pointer text-white bg-purple-500 p-2 ml-2 rounded-lg hover:bg-purple-600 transition-colors">
      <FaMoneyCheckAlt size={20} className="mr-2" />
      <Link href="/instructor/revenue" className="inline-block">
        Revenue
      </Link>
    </div>
  </div>
);

export default InstructorNav;
