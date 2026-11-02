import { Rate, Space, Typography } from "notebuddy-ui";

const { Text } = Typography;

export const RateThisNote = () => (
  <Space direction="vertical">
    <Text strong>Rate this note</Text>
    <Rate defaultValue={4} />
  </Space>
);

export const ReadOnlyAverage = () => (
  <Space>
    <Rate disabled allowHalf defaultValue={4.5} />
    <Text type="secondary">4.6 (18 ratings)</Text>
  </Space>
);

export const Compact = () => <Rate disabled allowHalf defaultValue={3.5} style={{ fontSize: 14 }} />;
