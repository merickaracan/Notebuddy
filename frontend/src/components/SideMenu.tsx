import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Typography, message, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  PlusOutlined,
  DashboardOutlined,
  TrophyOutlined,
  FileTextOutlined,
  BookOutlined,
  LogoutOutlined,
  SearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useTheme } from "./ThemeContext";
import { brand } from "../theme";
import { logout } from "../api/auth";

const { Sider } = Layout;
const { Text } = Typography;

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { token } = theme.useToken();
  
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isTeacher = currentUser?.role === "teacher";
  const dashboardPath = isTeacher ? "/teacher-dashboard" : "/dashboard";

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      localStorage.removeItem("user");
      message.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Still clear local storage even if logout fails
      localStorage.removeItem("user");
      message.success("Logged out successfully");
      navigate("/login");
    } finally {
      setLogoutLoading(false);
    }
  };

  const currentKey = (() => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/teacher-dashboard") return "dashboard";
    if (path === "/leaderboard") return "leaderboard";
    if (path === "/my-notes") return "my-notes";
    if (path === "/search-notes") return "search-notes";
    if (path === "/modules") return "modules";
    if (path === "/profile") return "profile";
    return "dashboard";
  })();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate(dashboardPath),
    },
    {
      key: "leaderboard",
      icon: <TrophyOutlined />,
      label: "Leaderboard",
      onClick: () => navigate("/leaderboard"),
    },
    ...(!isTeacher
      ? [
          {
            key: "my-notes",
            icon: <FileTextOutlined />,
            label: "My Notes",
            onClick: () => navigate("/my-notes"),
          },
        ]
      : []),
    {
      key: "search-notes",
      icon: <SearchOutlined />,
      label: "Search Notes",
      onClick: () => navigate("/search-notes"),
    },
    {
      key: "modules",
      icon: <BookOutlined />,
      label: "Modules",
      onClick: () => navigate("/modules"),
    },
    { type: "divider" as const },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      width={220}
      collapsedWidth={64}
      style={{
        background: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
      }}
    >
      {/* Collapse toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "16px 0" : "16px 20px",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          height: 64,
          boxSizing: "border-box",
        }}
      >
        {!collapsed && (
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: brand.gradient,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              N
            </span>
            <Text strong style={{ fontSize: 16 }}>
              NoteBuddy
            </Text>
          </span>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: token.colorTextSecondary }}
        />
      </div>

      {/* Create Note button — hidden for teacher */}
      {!isTeacher && (
        <div style={{ padding: collapsed ? "12px 8px" : "12px 16px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            block
            size={collapsed ? "middle" : "large"}
            style={{ background: brand.gradient, border: "none", borderRadius: 10 }}
            onClick={() => navigate("/create-note")}
          >
            {!collapsed && "Create Note"}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <Menu
        mode="inline"
        selectedKeys={[currentKey]}
        items={menuItems}
        style={{
          background: "transparent",
          borderRight: "none",
          flex: 1,
        }}
      />

      {/* Bottom actions */}
      <div
        style={{
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          padding: collapsed ? "12px 8px" : "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Button
          type="text"
          icon={<HomeOutlined />}
          block
          onClick={() => navigate("/")}
          style={{
            textAlign: "left",
            color: token.colorTextSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {!collapsed && "Home"}
        </Button>
        <Button
          type="text"
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          block
          onClick={toggleTheme}
          style={{
            textAlign: "left",
            color: token.colorTextSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {!collapsed && (isDark ? "Light Mode" : "Dark Mode")}
        </Button>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          block
          danger
          loading={logoutLoading}
          onClick={handleLogout}
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {!collapsed && "Log Out"}
        </Button>
      </div>
    </Sider>
  );
};

export default SideMenu;
