import { Menu } from "antd";
import Link from "next/link";

const { Item, ItemGroup } = Menu;

const InstructorNav = () => (
  <Menu mode="horizontal">
    <ItemGroup>
      <Item className="font-bold cursor-pointer bg-purple-500" key="dashboard"  >
        <Link href="/instructor">Dashboard</Link>
      </Item>
      <Item
        className="font-bold cursor-pointer bg-purple-500"
        key="create-course" style={{ marginLeft: "1rem" }}
      >
        <Link  href="/instructor/course/create">Create Course</Link>
      </Item>
    </ItemGroup>
  </Menu>
);

export default InstructorNav;
