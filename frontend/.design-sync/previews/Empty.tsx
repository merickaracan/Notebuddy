import { Empty, Button, Icons } from "notebuddy-ui";

export const NoNotes = () => (
  <Empty description="You haven't created any notes yet">
    <Button type="primary" icon={<Icons.PlusOutlined />}>Create your first note</Button>
  </Empty>
);

export const NoResults = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notes match “dynamic programming”" />
);
