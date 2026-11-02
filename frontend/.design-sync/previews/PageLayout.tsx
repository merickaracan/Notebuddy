import { PageLayout, Card, Typography, Row, Col, Tag } from "notebuddy-ui";

export const DashboardPage = () => (
  <div style={{ height: 560, overflow: "hidden" }}>
    <PageLayout>
      <div style={{ padding: 24 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>Welcome back, Ava</Typography.Title>
        <Row gutter={16}>
          {["Observer pattern summary", "Dijkstra's algorithm", "Gradient descent"].map((t, i) => (
            <Col span={8} key={t}>
              <Card title={t} size="small"><Tag color="blue">{["CM22007", "CM22008", "CM22009"][i]}</Tag></Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  </div>
);
