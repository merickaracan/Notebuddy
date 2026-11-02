import { Input, Space, Icons } from "notebuddy-ui";

export const Search = () => (
  <div style={{ width: 360 }}>
    <Input size="large" placeholder="Search notes by title or author" prefix={<Icons.SearchOutlined />} allowClear />
  </div>
);

export const LoginFields = () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input prefix={<Icons.MailOutlined />} placeholder="you@bath.ac.uk" defaultValue="at2201@bath.ac.uk" />
    <Input.Password prefix={<Icons.LockOutlined />} placeholder="Password" defaultValue="hunter2!A" />
  </Space>
);

export const TextArea = () => (
  <div style={{ width: 360 }}>
    <Input.TextArea rows={3} showCount maxLength={300} defaultValue="Great summary, but the diagram for the observer pattern is missing the unsubscribe step." />
  </div>
);

export const States = () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input status="error" defaultValue="ava@gmail.com" />
    <Input disabled defaultValue="Lecturer account" />
  </Space>
);
