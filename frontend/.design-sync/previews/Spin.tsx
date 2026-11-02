import { Spin, Card } from "notebuddy-ui";

export const Sizes = () => (
  <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </div>
);

export const WrappingContent = () => (
  <div style={{ width: 320 }}>
    <Spin spinning tip="Loading notes...">
      <Card title="Recent notes">
        <p>Observer pattern summary</p>
        <p>Week 4 lecture notes</p>
      </Card>
    </Spin>
  </div>
);
