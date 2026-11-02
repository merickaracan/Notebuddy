import { Table, Tag, Button, Space, Icons } from "notebuddy-ui";

const rows = [
  { key: 1, title: "Observer pattern summary", author: "at2201@bath.ac.uk", module: "CM22007", verified: false },
  { key: 2, title: "Dijkstra's algorithm walkthrough", author: "lm612@bath.ac.uk", module: "CM22008", verified: true },
  { key: 3, title: "Gradient descent cheat sheet", author: "sn25@bath.ac.uk", module: "CM22009", verified: false },
  { key: 4, title: "NLP tokenisation notes", author: "oh48@bath.ac.uk", module: "CM32030", verified: true },
];

const columns = [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Author", dataIndex: "author", key: "author" },
  { title: "Module", dataIndex: "module", key: "module", render: (m: string) => <Tag color="blue">{m}</Tag> },
  { title: "Status", dataIndex: "verified", key: "verified", render: (v: boolean) => (v ? <Tag color="green">Verified</Tag> : <Tag color="orange">Pending</Tag>) },
  {
    title: "Action", key: "action",
    render: (_: unknown, r: { verified: boolean }) => (
      <Space>
        <Button size="small" icon={<Icons.EyeOutlined />}>View</Button>
        {r.verified ? <Button size="small" danger>Unverify</Button> : <Button size="small" type="primary" icon={<Icons.SafetyCertificateOutlined />}>Verify</Button>}
      </Space>
    ),
  },
];

export const TeacherReview = () => <Table columns={columns} dataSource={rows} pagination={false} />;

export const Empty = () => <Table columns={columns} dataSource={[]} pagination={false} />;
