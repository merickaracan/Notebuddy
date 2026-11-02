import { Select, Space } from "notebuddy-ui";

const modules = [
  { value: "CM22007", label: "CM22007 · Software Engineering" },
  { value: "CM22008", label: "CM22008 · Algorithms and Complexity" },
  { value: "CM22009", label: "CM22009 · Machine Learning" },
  { value: "CM22010", label: "CM22010 · Visual Computing" },
];

export const ModulePicker = () => (
  <Select style={{ width: 320 }} placeholder="Select a module" defaultValue="CM22007" options={modules} />
);

export const SortBy = () => (
  <Space>
    <Select style={{ width: 180 }} defaultValue="rating" options={[{ value: "rating", label: "Highest rated" }, { value: "recent", label: "Most recent" }, { value: "title", label: "Title A–Z" }]} />
  </Space>
);

export const Multiple = () => (
  <Select mode="multiple" style={{ width: 360 }} defaultValue={["CM22007", "CM22009"]} options={modules} />
);
