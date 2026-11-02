// NoteBuddy UI: the app's shared components plus the Ant Design pieces its pages are built from.
export { default as NoteBuddyProvider } from "./NoteBuddyProvider";
export { ThemeProvider, useTheme } from "../src/components/ThemeContext";
export { default as PageLayout } from "../src/components/PageHeader";
export { default as SideMenu } from "../src/components/SideMenu";
export { default as Leaderboard } from "../src/components/Leaderboard";
export { default as Modules, AVAILABLE_MODULES } from "../src/components/Modules";

export {
  Avatar, Badge, Button, Card, Col, ConfigProvider, Descriptions, Divider, Drawer, Empty,
  Form, Input, InputNumber, Layout, List, Menu, Modal, Rate, Result, Row, Select, Space,
  Spin, Steps, Switch, Table, Tag, Typography, Upload, message, theme,
} from "antd";

export * as Icons from "./icons";
