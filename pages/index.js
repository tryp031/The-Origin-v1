import { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";

const { Header, Content } = Layout;

import MenuPage from "../components/Menu";
import useUser from "../hooks/useUser";

export default function Home({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/");
  }, [user]);

  return (
    <>
      <Layout>
        <Header className="header">
          <Row>
            <Col span={4}>
              <div className="logo"></div>
            </Col>
            <Col span={20}>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout>
          <MenuPage />
          <Layout style={{ padding: "0 24px 24px" }}>
            {/* TODO: Crear componente */}
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
