import {
  DashboardOutlined,
  DollarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
const { Header, Footer, Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="bg-white"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onSelect={(e) => console.log(e.item.props.link)}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              key: "2",
              icon: <DollarOutlined />,
              label: "Payment Status",
              link: "/payment-status",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Analytics",
              link: "/analytics",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
