import { Row, Col, Card } from "notebuddy-ui";

const cell = (label: string) => (
  <Card size="small" style={{ textAlign: "center", background: "#f0f5ff" }}>{label}</Card>
);

export const Spans = () => (
  <div style={{ width: 600 }}>
    <Row gutter={[16, 16]}>
      <Col span={24}>{cell("span 24")}</Col>
      <Col span={12}>{cell("span 12")}</Col>
      <Col span={12}>{cell("span 12")}</Col>
      <Col span={8}>{cell("span 8")}</Col>
      <Col span={8}>{cell("span 8")}</Col>
      <Col span={8}>{cell("span 8")}</Col>
    </Row>
  </div>
);

export const Responsive = () => (
  <div style={{ width: 600 }}>
    <Row gutter={16}>
      <Col xs={24} md={16}>{cell("Main content (16)")}</Col>
      <Col xs={24} md={8}>{cell("Sidebar (8)")}</Col>
    </Row>
  </div>
);
