import { Typography, Tag } from "notebuddy-ui";

const { Title, Text, Paragraph } = Typography;

export const Headings = () => (
  <div>
    <Title level={2} style={{ marginTop: 0 }}>Welcome back, Ava</Title>
    <Title level={3}>Software Engineering</Title>
    <Title level={4}>Week 6: Design Patterns</Title>
    <Title level={5}>Recent notes</Title>
  </div>
);

export const NoteBody = () => (
  <div style={{ maxWidth: 520 }}>
    <Title level={4} style={{ marginTop: 0 }}>Observer pattern</Title>
    <Paragraph>
      The observer pattern defines a one-to-many dependency between objects so that when one object
      changes state, all of its dependents are <Text strong>notified and updated automatically</Text>.
    </Paragraph>
    <Paragraph type="secondary">
      Shared by Leo M. · CM22007 · <Tag color="green">Verified</Tag>
    </Paragraph>
  </div>
);

export const TextStyles = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <Text>Default body text</Text>
    <Text type="secondary">Secondary: 12 notes shared</Text>
    <Text type="success">Note verified by your lecturer</Text>
    <Text type="warning">Draft not yet published</Text>
    <Text type="danger">Upload failed, file is larger than 10 MB</Text>
    <Text code>CM22007</Text>
    <Text mark>Exam topic</Text>
    <Text delete>Old deadline: 14 March</Text>
  </div>
);
