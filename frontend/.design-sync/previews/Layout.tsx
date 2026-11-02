import { Layout, Typography } from "notebuddy-ui";

const { Header, Content, Sider, Footer } = Layout;

export const AppShell = () => (
  <Layout style={{ height: 320, width: 720 }}>
    <Sider width={160} style={{ background: "#001529", color: "#fff", padding: 16 }}>Navigation</Sider>
    <Layout style={{ background: "#f0f5ff" }}>
      <Header style={{ background: "#0b5ed7", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography.Title level={4} style={{ margin: 0, color: "#fff" }}>Notebuddy</Typography.Title>
      </Header>
      <Content style={{ padding: 24 }}>Page content</Content>
      <Footer style={{ textAlign: "center" }}>University of Bath · NoteBuddy</Footer>
    </Layout>
  </Layout>
);
