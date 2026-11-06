import React from "react";
import { ConfigProvider } from "antd";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "../src/components/ThemeContext";
import { getThemeConfig } from "../src/theme";

interface NoteBuddyProviderProps {
  children: React.ReactNode;
  /** Route the in-memory router starts on, e.g. "/dashboard". */
  initialPath?: string;
}

// Mirrors App.tsx: NoteBuddy's Ant Design theme, following the light/dark toggle.
const ThemedConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <ConfigProvider theme={getThemeConfig(isDark)}>
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
