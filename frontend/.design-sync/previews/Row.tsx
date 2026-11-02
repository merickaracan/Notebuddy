import { Row, Col, Card } from "notebuddy-ui";

const box = (label: string) => <Card size="small" style={{ width: 120, textAlign: "center" }}>{label}</Card>;

export const Gutter = () => (
  <div style={{ width: 600 }}>
    <Row gutter={[16, 16]}>
      {["CM22007", "CM22008", "CM22009", "CM22010", "CM22011", "CM22012"].map((c) => (
        <Col span={8} key={c}><Card size="small" style={{ textAlign: "center" }}>{c}</Card></Col>
      ))}
    </Row>
  </div>
);

export const Justify = () => (
  <div style={{ width: 600, display: "flex", flexDirection: "column", gap: 12 }}>
    <Row justify="start">{box("start")}</Row>
    <Row justify="center">{box("center")}</Row>
    <Row justify="space-between">{box("left")}{box("right")}</Row>
  </div>
);
