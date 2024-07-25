import { Card } from "antd";
import { useState } from "react";
import { Layout, Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import { userPath } from "../../routes/routeConfig";
import UserLayout from "../../components/layout/UserLayout";
import {
  FileOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const DevBoard = () => {
  // const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <UserLayout showFooter={false}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Card
        title={<h1 className="text-2xl font-semibold">Account Settings</h1>}
        className="w-full mx-auto md:px-5 pt-4"
      ></Card>
    </UserLayout>
  );
};

export default DevBoard;
