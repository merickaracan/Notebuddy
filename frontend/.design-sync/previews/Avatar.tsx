import { Avatar, Space, Icons } from "notebuddy-ui";

export const Variants = () => (
  <Space size="large" align="center">
    <Avatar size={64} icon={<Icons.UserOutlined />} />
    <Avatar size={48} style={{ backgroundColor: "#0b5ed7" }}>AT</Avatar>
    <Avatar style={{ backgroundColor: "#52c41a" }}>LM</Avatar>
    <Avatar size="small" style={{ backgroundColor: "#fa8c16" }}>SN</Avatar>
  </Space>
);

export const Group = () => (
  <Avatar.Group max={{ count: 3 }}>
    <Avatar style={{ backgroundColor: "#0b5ed7" }}>AT</Avatar>
    <Avatar style={{ backgroundColor: "#52c41a" }}>LM</Avatar>
    <Avatar style={{ backgroundColor: "#fa8c16" }}>SN</Avatar>
    <Avatar style={{ backgroundColor: "#722ed1" }}>OH</Avatar>
    <Avatar style={{ backgroundColor: "#eb2f96" }}>GL</Avatar>
  </Avatar.Group>
);
