import { theme, type ThemeConfig } from "antd";

// NoteBuddy's visual language: indigo-blue accent, soft surfaces, rounded shapes.
export const brand = {
  primary: "#4361ee",
  primaryDark: "#6c8cff",
  gradient: "linear-gradient(135deg, #4361ee 0%, #7b5cff 100%)",
  pageLight: "#f5f7fb",
  pageDark: "#0f1117",
  surfaceDark: "#171a23",
  gold: "#f5b301",
  silver: "#a7b1c2",
  bronze: "#e08a4f",
};

export const fontFamily =
  "'Inter', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export const getThemeConfig = (isDark: boolean): ThemeConfig => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: isDark ? brand.primaryDark : brand.primary,
    colorInfo: isDark ? brand.primaryDark : brand.primary,
    colorSuccess: "#12b76a",
    colorWarning: "#f79009",
    colorError: "#f04438",
    colorBgLayout: isDark ? brand.pageDark : brand.pageLight,
    colorBgContainer: isDark ? brand.surfaceDark : "#ffffff",
    colorBorderSecondary: isDark ? "#252a36" : "#eef0f5",
    fontFamily,
    fontSize: 14,
    borderRadius: 10,
    borderRadiusLG: 14,
    boxShadowTertiary: isDark
      ? "0 1px 2px rgba(0,0,0,0.4)"
      : "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
  },
  components: {
    Layout: {
      headerBg: isDark ? brand.surfaceDark : "#ffffff",
      siderBg: isDark ? brand.surfaceDark : "#ffffff",
      bodyBg: isDark ? brand.pageDark : brand.pageLight,
      headerHeight: 64,
      headerPadding: "0 24px",
    },
    Card: { paddingLG: 20 },
    Button: { fontWeight: 500, primaryShadow: "0 4px 12px rgba(67,97,238,0.25)" },
    Menu: {
      itemBorderRadius: 10,
      itemHeight: 42,
      itemSelectedBg: isDark ? "rgba(108,140,255,0.16)" : "rgba(67,97,238,0.08)",
      itemSelectedColor: isDark ? brand.primaryDark : brand.primary,
    },
    Segmented: { itemSelectedBg: isDark ? "#252a36" : "#ffffff" },
    Tag: { defaultBg: isDark ? "#252a36" : "#f2f4f7" },
  },
});
