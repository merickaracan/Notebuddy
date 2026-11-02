import { Space, Button, Tag, Icons } from "notebuddy-ui";

export const Horizontal = () => (
  <Space>
    <Button type="primary" icon={<Icons.SaveOutlined />}>Save</Button>
    <Button>Preview</Button>
    <Button type="text">Cancel</Button>
  </Space>
);

export const Vertical = () => (
  <Space direction="vertical" size="middle">
    <Tag color="blue">CM22007 · Software Engineering</Tag>
    <Tag color="blue">CM22008 · Algorithms and Complexity</Tag>
    <Tag color="blue">CM22009 · Machine Learning</Tag>
  </Space>
);

export const Wrap = () => (
  <div style={{ width: 280 }}>
    <Space wrap>
      {["Graphs", "Recursion", "Big-O", "Hashing", "Sorting", "Trees", "Heaps"].map((t) => <Tag key={t}>{t}</Tag>)}
    </Space>
  </div>
);
