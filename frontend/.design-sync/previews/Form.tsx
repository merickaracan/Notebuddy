import { Form, Input, Button, Select, Icons } from "notebuddy-ui";

export const Login = () => (
  <div style={{ width: 360 }}>
    <Form layout="vertical" initialValues={{ email: "at2201@bath.ac.uk" }}>
      <Form.Item label="University email" name="email" rules={[{ required: true }]}>
        <Input prefix={<Icons.MailOutlined />} />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password prefix={<Icons.LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Button type="primary" block icon={<Icons.LoginOutlined />}>Log in</Button>
    </Form>
  </div>
);

export const CreateNote = () => (
  <div style={{ width: 420 }}>
    <Form layout="vertical">
      <Form.Item label="Title" required>
        <Input placeholder="e.g. Week 6: Design patterns" />
      </Form.Item>
      <Form.Item label="Module" required>
        <Select placeholder="Select a module" options={[{ value: "CM22007", label: "CM22007 · Software Engineering" }]} />
      </Form.Item>
      <Form.Item label="Email" validateStatus="error" help="Use your @bath.ac.uk address">
        <Input defaultValue="ava@gmail.com" />
      </Form.Item>
      <Button type="primary" icon={<Icons.SaveOutlined />}>Publish note</Button>
    </Form>
  </div>
);
