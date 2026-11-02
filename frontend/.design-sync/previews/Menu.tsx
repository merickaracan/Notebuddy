import { Menu, Icons } from "notebuddy-ui";

const items = [
  { key: "dashboard", icon: <Icons.DashboardOutlined />, label: "Dashboard" },
  { key: "leaderboard", icon: <Icons.TrophyOutlined />, label: "Leaderboard" },
  { key: "my-notes", icon: <Icons.FileTextOutlined />, label: "My Notes" },
  { key: "search-notes", icon: <Icons.SearchOutlined />, label: "Search Notes" },
  { key: "modules", icon: <Icons.BookOutlined />, label: "Modules" },
  { key: "profile", icon: <Icons.UserOutlined />, label: "Profile" },
];

export const Sidebar = () => (
  <div style={{ width: 220 }}>
    <Menu mode="inline" defaultSelectedKeys={["dashboard"]} items={items} />
  </div>
);

export const SidebarDark = () => (
  <div style={{ width: 220 }}>
    <Menu mode="inline" theme="dark" defaultSelectedKeys={["modules"]} items={items} />
  </div>
);

export const Horizontal = () => (
  <div style={{ width: 600 }}>
    <Menu mode="horizontal" defaultSelectedKeys={["dashboard"]} items={items.slice(0, 4)} />
  </div>
);
