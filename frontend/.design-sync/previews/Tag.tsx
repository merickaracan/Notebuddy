import { Tag, Space, Icons } from "notebuddy-ui";

export const Status = () => (
  <Space wrap>
    <Tag color="green" icon={<Icons.CheckCircleOutlined />}>Verified</Tag>
    <Tag color="orange">Pending review</Tag>
    <Tag color="red" icon={<Icons.CloseCircleOutlined />}>Rejected</Tag>
    <Tag>Draft</Tag>
  </Space>
);

export const Modules = () => (
  <Space wrap>
    <Tag color="blue">CM22007</Tag>
    <Tag color="geekblue">CM22008</Tag>
    <Tag color="purple">CM22009</Tag>
    <Tag color="cyan">CM32030</Tag>
  </Space>
);

export const Ranks = () => (
  <Space>
    <Tag style={{ backgroundColor: "#FFD700", border: "none", fontWeight: 600 }}>1st</Tag>
    <Tag style={{ backgroundColor: "#C0C0C0", border: "none", fontWeight: 600 }}>2nd</Tag>
    <Tag style={{ backgroundColor: "#E8913D", border: "none", fontWeight: 600, color: "#fff" }}>3rd</Tag>
  </Space>
);

export const Closable = () => (
  <Space>
    <Tag closable>Exam revision</Tag>
    <Tag closable>Week 6</Tag>
  </Space>
);
