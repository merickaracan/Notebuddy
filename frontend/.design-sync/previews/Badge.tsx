import { Badge, Avatar, Space, Button, Icons } from "notebuddy-ui";

export const Counts = () => (
  <Space size="large">
    <Badge count={3}><Avatar shape="square" icon={<Icons.FileTextOutlined />} /></Badge>
    <Badge count={12} color="#0b5ed7"><Button icon={<Icons.MailOutlined />}>Comments</Button></Badge>
    <Badge dot><Avatar shape="square" icon={<Icons.UserOutlined />} /></Badge>
  </Space>
);

export const Status = () => (
  <Space direction="vertical">
    <Badge status="success" text="Verified by lecturer" />
    <Badge status="processing" text="Awaiting review" />
    <Badge status="default" text="Draft" />
    <Badge status="error" text="Rejected" />
  </Space>
);

export const Ribbon = () => (
  <div style={{ width: 280 }}>
    <Badge.Ribbon text="Verified" color="green">
      <div style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16 }}>
        <strong>Dijkstra's algorithm</strong>
        <div style={{ color: "rgba(0,0,0,0.45)" }}>CM22008 · Algorithms and Complexity</div>
      </div>
    </Badge.Ribbon>
  </div>
);
