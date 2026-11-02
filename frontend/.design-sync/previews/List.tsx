import { List, Avatar, Tag, Rate, Icons } from "notebuddy-ui";

const notes = [
  { title: "Observer pattern summary", module: "CM22007", rating: 4.5, verified: true },
  { title: "Dijkstra's algorithm walkthrough", module: "CM22008", rating: 4, verified: true },
  { title: "Gradient descent cheat sheet", module: "CM22009", rating: 3.5, verified: false },
];

export const RecentNotes = () => (
  <div style={{ width: 520 }}>
    <List
      bordered
      header={<strong>Recent notes</strong>}
      dataSource={notes}
      renderItem={(n) => (
        <List.Item extra={<Rate disabled allowHalf defaultValue={n.rating} style={{ fontSize: 12 }} />}>
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: "#0b5ed7" }} icon={<Icons.FileTextOutlined />} />}
            title={n.title}
            description={<><Tag color="blue">{n.module}</Tag>{n.verified && <Tag color="green">Verified</Tag>}</>}
          />
        </List.Item>
      )}
    />
  </div>
);

export const Comments = () => (
  <div style={{ width: 520 }}>
    <List
      itemLayout="horizontal"
      dataSource={[
        { who: "LM", name: "Leo Martins", text: "Really clear, thanks! Could you add an example with unsubscribe?" },
        { who: "SN", name: "Sofia Novak", text: "Suggest renaming “listener” to “observer” for consistency with the lecture." },
      ]}
      renderItem={(c) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar>{c.who}</Avatar>} title={c.name} description={c.text} />
        </List.Item>
      )}
    />
  </div>
);
