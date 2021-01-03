import { Layout, Menu } from "antd";
import { UserOutlined, NotificationOutlined } from "@ant-design/icons";
import Link from "next/link";

import useUser from "../hooks/useUser";

const { SubMenu } = Menu;
const { Sider } = Layout;

const MenuPage = () => {
  const { signOut, user } = useUser();

  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title={user ? user.username : "Guest"}
          >
            <Menu.Item key="1">Summary</Menu.Item>
            <Menu.Item key="2">Roles</Menu.Item>
            <Menu.Item key="3">Admin User</Menu.Item>
            <Menu.Item key="4">
              <a onClick={signOut} className="text-xs-right">
                Logout
              </a>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="About">
            <Menu.Item key="5">
              <Link href="/about">
                <a className="text-xs-right">Page</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
};

export default MenuPage;
