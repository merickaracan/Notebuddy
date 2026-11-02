import React from "react";
import { ConfigProvider, theme } from "antd";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "../src/components/ThemeContext";

interface NoteBuddyProviderProps {
  children: React.ReactNode;
  /** Route the in-memory router starts on, e.g. "/dashboard". */
  initialPath?: string;
}

// Mirrors App.tsx: Ant Design's light/dark algorithm follows NoteBuddy's theme toggle.
const ThemedConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      {children}
    </ConfigProvider>
  );
};

/** Root wrapper for every NoteBuddy screen: theme context, Ant Design theme and a router. */
const NoteBuddyProvider: React.FC<NoteBuddyProviderProps> = ({ children, initialPath = "/dashboard" }) => (
  <ThemeProvider>
    <ThemedConfig>
      <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
    </ThemedConfig>
  </ThemeProvider>
);

export default NoteBuddyProvider;
