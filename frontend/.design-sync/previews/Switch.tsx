import { Switch, Space, Typography, Icons } from "notebuddy-ui";

const { Text } = Typography;

export const ThemeToggle = () => (
  <Space>
    <Icons.SunOutlined />
    <Switch defaultChecked={false} />
    <Icons.MoonOutlined />
  </Space>
);

export const States = () => (
  <Space direction="vertical">
    <Space><Switch defaultChecked /><Text>Email me when my note is rated</Text></Space>
    <Space><Switch /><Text>Show only verified notes</Text></Space>
    <Space><Switch disabled defaultChecked /><Text type="secondary">Lecturer account (locked)</Text></Space>
    <Space><Switch size="small" defaultChecked /><Text>Compact view</Text></Space>
  </Space>
);

export const WithLabels = () => <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked />;
