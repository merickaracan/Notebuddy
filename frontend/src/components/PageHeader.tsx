import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Input, Button, Avatar, Dropdown, Tooltip, theme } from "antd";
import { SearchOutlined, SunOutlined, MoonOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import SideMenu from "./SideMenu";
import { useTheme } from "./ThemeContext";
import { brand } from "../theme";
import { logout } from "../api/auth";

const { Text } = Typography;
const { Header } = Layout;

interface PageHeaderProps {
  children: React.ReactNode;
}

const initialsOf = (name?: string, email?: string) => {
  const source = name?.trim() || email?.split("@")[0] || "";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : source.slice(0, 2)).toUpperCase() || "?";
};

const PageLayout: React.FC<PageHeaderProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userMenu = {
    items: [
      { key: "profile", icon: <UserOutlined />, label: "Profile", onClick: () => navigate("/profile") },
      { type: "divider" as const },
      { key: "logout", icon: <LogoutOutlined />, label: "Log out", danger: true, onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "saturate(180%) blur(8px)",
            background: isDark ? "rgba(23,26,35,0.85)" : "rgba(255,255,255,0.85)",
          }}
        >
          <Text
            strong
            style={{
              fontSize: 18,
              letterSpacing: -0.3,
              background: brand.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Notebuddy
          </Text>

          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: token.colorTextTertiary }} />}
            placeholder="Search notes by title…"
            style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto", borderRadius: 999 }}
            onPressEnter={(e) => {
              const q = (e.target as HTMLInputElement).value.trim();
              navigate(q ? `/search-notes?q=${encodeURIComponent(q)}` : "/search-notes");
            }}
          />

          <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <Button
              type="text"
              shape="circle"
              aria-label="Toggle theme"
              icon={isDark ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
            />
          </Tooltip>

          <Dropdown menu={userMenu} trigger={["click"]} placement="bottomRight">
            <Avatar
              style={{ background: brand.gradient, cursor: "pointer", flexShrink: 0 }}
              aria-label="Account menu"
            >
              {initialsOf(currentUser?.name, currentUser?.email)}
            </Avatar>
          </Dropdown>
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default PageLayout;
