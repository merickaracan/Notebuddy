# NoteBuddy UI: how to build with it

NoteBuddy is a University of Bath note-sharing app (students share study notes by module, rate them, climb a leaderboard; lecturers verify notes). Its UI is **Ant Design 6** plus a few NoteBuddy components. Everything is on `window.NoteBuddy`.

## 1. Always wrap screens in `NoteBuddyProvider`

`NoteBuddyProvider` supplies the NoteBuddy theme context (light/dark), Ant Design's theme algorithm and a router. `SideMenu`, `PageLayout`, `Leaderboard` and `Modules` throw or render unstyled without it. Use one at the root; never nest a second router inside it.

```jsx
const { NoteBuddyProvider, PageLayout, Card, Row, Col, Tag, Typography } = window.NoteBuddy;

<NoteBuddyProvider initialPath="/dashboard">
  <PageLayout>
    <div style={{ padding: 24 }}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>Welcome back, Ava</Typography.Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Observer pattern summary" size="small"><Tag color="blue">CM22007</Tag></Card>
        </Col>
      </Row>
    </div>
  </PageLayout>
</NoteBuddyProvider>
```

## 2. Styling idiom: Ant Design props + inline styles, no CSS classes

There is no utility-class or token stylesheet. Style through component props (`type`, `size`, `color`, `danger`, `status`, `level`) and `style={{...}}` for layout glue. Do not invent class names.

NoteBuddy's own colours (used inline in the app):
- Brand blue `#0b5ed7` (header bar, primary accents); dark-mode header `#1a3a6e`
- Page background `#f0f5ff` (light) / `#141414` (dark)
- Leaderboard ranks: gold `#FFD700`, silver `#C0C0C0`, bronze `#E8913D`

Recurring patterns:
- Module codes: `<Tag color="blue">CM22007</Tag>`
- Verification: `<Tag color="green">Verified</Tag>` / `<Tag color="orange">Pending</Tag>`
- Ratings: `<Rate disabled allowHalf value={4.5} />`
- Page content padding `24`, grid via `Row gutter={16}` + `Col span={8}`
- Typography via `Typography.Title` / `Text` / `Paragraph` (`type="secondary"` for muted text)

## 3. Components

- **NoteBuddy:** `PageLayout` (side menu + blue "Notebuddy" header + content; use as every page's shell), `SideMenu`, `Leaderboard` (`limit?`), `Modules` (module grid with search), `useTheme()` (`{ isDark, toggleTheme }`), `AVAILABLE_MODULES` (real module list: `{ id, name, code, year }`).
- **Ant Design:** Avatar, Badge, Button, Card, Col, Descriptions, Divider, Drawer, Empty, Form, Input, InputNumber, Layout, List, Menu, Modal, Rate, Result, Row, Select, Space, Spin, Steps, Switch, Table, Tag, Typography, Upload, plus `message` and `theme`.
- **Icons:** `NoteBuddy.Icons.<Name>`, e.g. `Icons.PlusOutlined`, `Icons.SearchOutlined`, `Icons.TrophyOutlined`, `Icons.BookOutlined`, `Icons.FileTextOutlined`, `Icons.EditOutlined`, `Icons.DeleteOutlined`, `Icons.DownloadOutlined`, `Icons.SafetyCertificateOutlined`, `Icons.UserOutlined`.

`Leaderboard` loads `/api/notes/leaderboard` and shows an empty table without a backend. In mockups, build a `Table` with sample rows instead.

## 4. Where the truth lives

Each component's `<Name>.d.ts` is its prop contract and `<Name>.prompt.md` has worked examples. `styles.css` only sets the page font (`system-ui, Helvetica, Arial, sans-serif`); Ant Design injects all other styles at runtime.
