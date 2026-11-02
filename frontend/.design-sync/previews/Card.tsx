import { Card, Tag, Rate, Typography, Button, Space, Icons } from "notebuddy-ui";

const { Text, Paragraph } = Typography;

export const NoteCard = () => (
  <Card
    hoverable
    style={{ width: 320 }}
    title="Observer pattern summary"
    extra={<Tag color="green">Verified</Tag>}
  >
    <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
      One-to-many dependency between objects: when the subject changes, every observer is notified.
    </Paragraph>
    <Space>
      <Tag color="blue">CM22007</Tag>
      <Rate disabled allowHalf defaultValue={4.5} style={{ fontSize: 14 }} />
    </Space>
  </Card>
);

export const WithActions = () => (
  <Card
    style={{ width: 320 }}
    actions={[<Icons.EyeOutlined key="view" />, <Icons.EditOutlined key="edit" />, <Icons.DeleteOutlined key="delete" />]}
  >
    <Card.Meta title="Week 4 lecture notes" description="Programming 2 · 3 attachments" />
  </Card>
);

export const StatCard = () => (
  <Card style={{ width: 220 }}>
    <Text type="secondary">Notes shared</Text>
    <div style={{ fontSize: 32, fontWeight: 600, color: "#0b5ed7" }}>14</div>
    <Button type="link" style={{ padding: 0 }}>View my notes</Button>
  </Card>
);

export const Loading = () => <Card loading style={{ width: 320 }} title="Recent notes" />;
