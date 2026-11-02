import { Drawer, Space, Tag, Typography } from "notebuddy-ui";

// Drawer is position: fixed; the transformed frame contains it so the open state shows in place.
const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: "relative", width: 600, height: 380, transform: "translateZ(0)", overflow: "hidden", background: "#f0f5ff" }}>{children}</div>
);

export const NoteFilters = () => (
  <Frame>
    <Drawer open title="Filter notes" placement="right" width={300} getContainer={false}>
      <Space direction="vertical">
        <Typography.Text strong>Module</Typography.Text>
        <Space wrap><Tag color="blue">CM22007</Tag><Tag>CM22008</Tag><Tag>CM22009</Tag></Space>
        <Typography.Text strong>Status</Typography.Text>
        <Space wrap><Tag color="green">Verified only</Tag></Space>
      </Space>
    </Drawer>
  </Frame>
);
