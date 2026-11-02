import { InputNumber, Space, Typography } from "notebuddy-ui";

const { Text } = Typography;

export const Basic = () => (
  <Space direction="vertical">
    <Text>Year of study</Text>
    <InputNumber min={1} max={4} defaultValue={2} />
  </Space>
);

export const WithAddon = () => <InputNumber min={1} max={50} defaultValue={10} addonAfter="MB max upload" />;
