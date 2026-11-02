import { Button, Space, Icons } from "notebuddy-ui";

export const Types = () => (
  <Space wrap>
    <Button type="primary">Create note</Button>
    <Button>Cancel</Button>
    <Button type="dashed">Add attachment</Button>
    <Button type="text">Skip</Button>
    <Button type="link">View all notes</Button>
  </Space>
);

export const WithIcons = () => (
  <Space wrap>
    <Button type="primary" icon={<Icons.PlusOutlined />}>New note</Button>
    <Button icon={<Icons.DownloadOutlined />}>Download PDF</Button>
    <Button icon={<Icons.EditOutlined />}>Edit</Button>
    <Button shape="circle" icon={<Icons.SearchOutlined />} />
  </Space>
);

export const DangerAndStates = () => (
  <Space wrap>
    <Button danger icon={<Icons.DeleteOutlined />}>Delete note</Button>
    <Button type="primary" loading>Saving</Button>
    <Button type="primary" disabled>Submit for review</Button>
  </Space>
);

export const Sizes = () => (
  <Space wrap align="center">
    <Button type="primary" size="large" icon={<Icons.LoginOutlined />}>Log in</Button>
    <Button type="primary">Log in</Button>
    <Button type="primary" size="small">Log in</Button>
  </Space>
);
