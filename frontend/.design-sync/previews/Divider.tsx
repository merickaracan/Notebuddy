import { Divider, Typography, Space } from "notebuddy-ui";

const { Paragraph, Text } = Typography;

export const Horizontal = () => (
  <div style={{ width: 480 }}>
    <Paragraph>Notes you have created appear here.</Paragraph>
    <Divider />
    <Paragraph>Notes shared by other students appear below.</Paragraph>
    <Divider orientation="left">Year 2 modules</Divider>
    <Paragraph>Software Engineering, Machine Learning, Visual Computing</Paragraph>
    <Divider dashed />
  </div>
);

export const Vertical = () => (
  <Space>
    <Text>CM22007</Text>
    <Divider type="vertical" />
    <Text>14 notes</Text>
    <Divider type="vertical" />
    <Text type="secondary">Updated 2 days ago</Text>
  </Space>
);
