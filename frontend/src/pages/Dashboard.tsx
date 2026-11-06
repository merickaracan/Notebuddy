import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Empty,
  Tag,
  Button,
  Segmented,
  Input,
  Rate,
  Avatar,
  Skeleton,
  Tooltip,
  Space,
  theme,
} from "antd";
import {
  FileTextOutlined,
  PlusOutlined,
  BookOutlined,
  SearchOutlined,
  StarFilled,
  SafetyCertificateFilled,
  TrophyFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import PageLayout from "../components/PageHeader";
import { AVAILABLE_MODULES } from "../components/Modules";
import { brand } from "../theme";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

interface Note {
  id: number;
  email: string;
  note_title: string;
  note_data: string;
  module: string;
  verified: number;
  rating_average?: number;
  number_ratings?: number;
}

interface LeaderboardEntry {
  name: string;
  email: string;
  avgRating: number;
  totalNotes: number;
}

type NotesView = "mine" | "everyone";

// fetch wrapped so a failed or missing response resolves to null instead of throwing.
const getJson = <T,>(url: string): Promise<T | null> =>
  Promise.resolve()
    .then(() => fetch(url, { credentials: "include" }))
    .then((res) => res.json() as Promise<T>)
    .catch(() => null);

const MODULE_BY_CODE = Object.fromEntries(AVAILABLE_MODULES.map((m) => [m.code.toUpperCase(), m]));
const YEAR_COLORS: Record<number, string> = { 1: "blue", 2: "purple", 3: "cyan" };

const moduleColor = (code: string) => YEAR_COLORS[MODULE_BY_CODE[code?.toUpperCase()]?.year] ?? "geekblue";

const plainText = (html: string) => {
  const text = (html ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return text || "No description.";
};

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Animates a number from 0 up to `target`.
const useCountUp = (target: number, duration = 700) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
};

interface StatCardProps {
  label: string;
  value: number | null;
  decimals?: number;
  prefix?: string;
  icon: React.ReactNode;
  tint: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, decimals = 0, prefix = "", icon, tint, onClick }) => {
  const animated = useCountUp(value ?? 0);
  return (
    <Card className="nb-lift" hoverable={!!onClick} onClick={onClick} styles={{ body: { padding: 18 } }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            fontSize: 20,
            color: tint,
            background: `${tint}1a`,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {label}
          </Text>
          <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
            {value === null ? "—" : `${prefix}${animated.toFixed(decimals)}`}
          </div>
        </div>
      </div>
    </Card>
  );
};

const NoteCard: React.FC<{ note: Note; onOpen: () => void; showAuthor: boolean }> = ({ note, onOpen, showAuthor }) => {
  const rating = Number(note.rating_average ?? 0);
  const ratings = Number(note.number_ratings ?? 0);
  return (
    <Card hoverable className="nb-lift" onClick={onOpen} style={{ height: "100%" }} styles={{ body: { padding: 18 } }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <Tag color={moduleColor(note.module)} bordered={false} style={{ marginInlineEnd: 0 }}>
          {note.module}
        </Tag>
        {Number(note.verified) === 1 && (
          <Tooltip title="Verified by a lecturer">
            <SafetyCertificateFilled style={{ color: "#12b76a", fontSize: 16 }} />
          </Tooltip>
        )}
      </div>
      <Title level={5} style={{ margin: "0 0 6px" }} ellipsis={{ rows: 1 }}>
        {note.note_title || "Untitled Note"}
      </Title>
      <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ fontSize: 13, marginBottom: 12, minHeight: 40 }}>
        {plainText(note.note_data)}
      </Paragraph>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <Space size={6}>
          <Rate disabled allowHalf value={rating} style={{ fontSize: 12 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {ratings > 0 ? `${rating.toFixed(1)} (${ratings})` : "No ratings"}
          </Text>
        </Space>
        {showAuthor && (
          <Text type="secondary" style={{ fontSize: 12 }} ellipsis>
            {note.email.split("@")[0]}
          </Text>
        )}
      </div>
    </Card>
  );
};

const RANK_COLORS = [brand.gold, brand.silver, brand.bronze];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const firstName = (user?.name as string | undefined)?.split(" ")[0] || user?.email?.split("@")[0] || "there";

  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingMine, setLoadingMine] = useState(true);
  const [view, setView] = useState<NotesView>("mine");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Clear stale localStorage notes from the old local-only implementation
    localStorage.removeItem("myNotes");
    if (!user?.email) {
      setLoadingMine(false);
      return;
    }

    getJson<{ data?: Note[] }>(`/api/notes/email/${encodeURIComponent(user.email)}`).then((res) => {
      setMyNotes(res?.data ?? []);
      setLoadingMine(false);
    });
    getJson<{ data?: LeaderboardEntry[] }>("/api/notes/leaderboard").then((res) => {
      const rows = res?.data ?? [];
      setLeaderboard([...rows].sort((a, b) => Number(b.avgRating) - Number(a.avgRating)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (view === "everyone" && allNotes === null) {
      getJson<{ data?: Note[] }>("/api/notes").then((res) => setAllNotes(res?.data ?? []));
    }
  }, [view, allNotes]);

  const stats = useMemo(() => {
    const rated = myNotes.filter((n) => Number(n.number_ratings ?? 0) > 0);
    const avg = rated.length ? rated.reduce((sum, n) => sum + Number(n.rating_average), 0) / rated.length : null;
    const rankIndex = leaderboard.findIndex((e) => e.email === user?.email);
    return {
      notes: myNotes.length,
      avgRating: avg,
      verified: myNotes.filter((n) => Number(n.verified) === 1).length,
      rank: rankIndex >= 0 ? rankIndex + 1 : null,
    };
  }, [myNotes, leaderboard, user?.email]);

  const myModules = useMemo(() => {
    const counts = new Map<string, number>();
    myNotes.forEach((n) => n.module && counts.set(n.module.toUpperCase(), (counts.get(n.module.toUpperCase()) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [myNotes]);

  const shownNotes = useMemo(() => {
    const source = view === "mine" ? myNotes.slice(-3).reverse() : (allNotes ?? []).slice(0, 6);
    const q = filter.trim().toLowerCase();
    if (!q) return source;
    return source.filter(
      (n) => n.note_title?.toLowerCase().includes(q) || n.module?.toLowerCase().includes(q)
    );
  }, [view, myNotes, allNotes, filter]);

  const notesLoading = view === "mine" ? loadingMine : allNotes === null;

  return (
    <PageLayout>
      <Content style={{ padding: "28px 32px 48px", maxWidth: 1280, width: "100%", margin: "0 auto" }}>
        {/* Greeting + quick actions */}
        <div
          className="nb-fade-up"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24 }}
        >
          <div>
            <Title level={2} style={{ margin: 0, letterSpacing: -0.5 }}>
              {greeting()}, {firstName} 👋
            </Title>
            <Text type="secondary">Here's what's happening with your notes today.</Text>
          </div>
          <Space wrap>
            <Button icon={<BookOutlined />} onClick={() => navigate("/modules")}>
              Browse modules
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ background: brand.gradient, border: "none" }}
              onClick={() => navigate("/create-note")}
            >
              New note
            </Button>
          </Space>
        </div>

        {/* Stats */}
        <Row gutter={[16, 16]} className="nb-fade-up" style={{ marginBottom: 28, animationDelay: "60ms" }}>
          <Col xs={12} lg={6}>
            <StatCard label="Notes shared" value={stats.notes} icon={<FileTextOutlined />} tint={token.colorPrimary} onClick={() => navigate("/my-notes")} />
          </Col>
          <Col xs={12} lg={6}>
            <StatCard label="Average rating" value={stats.avgRating} decimals={1} icon={<StarFilled />} tint={brand.gold} />
          </Col>
          <Col xs={12} lg={6}>
            <StatCard label="Verified notes" value={stats.verified} icon={<SafetyCertificateFilled />} tint="#12b76a" />
          </Col>
          <Col xs={12} lg={6}>
            <StatCard label="Leaderboard rank" value={stats.rank} prefix="#" icon={<TrophyFilled />} tint="#7b5cff" onClick={() => navigate("/leaderboard")} />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {/* Notes feed */}
          <Col xs={24} lg={16} className="nb-fade-up" style={{ animationDelay: "120ms" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Title level={4} style={{ margin: 0, marginRight: "auto" }}>
                Recent notes
              </Title>
              <Input
                allowClear
                size="middle"
                prefix={<SearchOutlined style={{ color: token.colorTextTertiary }} />}
                placeholder="Filter by title or module"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: 220 }}
              />
              <Segmented<NotesView>
                value={view}
                onChange={setView}
                options={[
                  { label: "My notes", value: "mine" },
                  { label: "Everyone", value: "everyone" },
                ]}
              />
            </div>

            {notesLoading ? (
              <Row gutter={[16, 16]}>
                {[0, 1, 2].map((i) => (
                  <Col xs={24} sm={12} xl={8} key={i}>
                    <Card>
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : shownNotes.length === 0 ? (
              <Card>
                <Empty
                  description={
                    filter
                      ? `No notes match “${filter}”`
                      : view === "mine"
                        ? "You have no notes yet."
                        : "No notes have been shared yet."
                  }
                >
                  {!filter && view === "mine" && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/create-note")}>
                      Create your first note
                    </Button>
                  )}
                </Empty>
              </Card>
            ) : (
              <Row gutter={[16, 16]}>
                {shownNotes.map((note) => (
                  <Col xs={24} sm={12} xl={8} key={note.id}>
                    <NoteCard note={note} showAuthor={view === "everyone"} onOpen={() => navigate(`/note/${note.id}`)} />
                  </Col>
                ))}
              </Row>
            )}

            <Button
              type="link"
              style={{ paddingInline: 0, marginTop: 12 }}
              onClick={() => navigate(view === "mine" ? "/my-notes" : "/search-notes")}
            >
              {view === "mine" ? "See all my notes" : "Explore all notes"} <ArrowRightOutlined />
            </Button>
          </Col>

          {/* Side column */}
          <Col xs={24} lg={8} className="nb-fade-up" style={{ animationDelay: "180ms" }}>
            <Card
              title={
                <span>
                  <TrophyFilled style={{ color: brand.gold, marginRight: 8 }} />
                  Top contributors
                </span>
              }
              extra={
                <Button type="link" size="small" onClick={() => navigate("/leaderboard")}>
                  View all
                </Button>
              }
              style={{ marginBottom: 24 }}
              styles={{ body: { padding: "8px 12px" } }}
            >
              {leaderboard.length === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No ratings yet" />
              ) : (
                leaderboard.slice(0, 5).map((entry, i) => {
                  const isMe = entry.email === user?.email;
                  return (
                    <div
                      key={entry.email}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 8px",
                        borderRadius: 10,
                        background: isMe ? token.controlItemBgActive : undefined,
                      }}
                    >
                      <span style={{ width: 22, textAlign: "center", fontWeight: 700, color: RANK_COLORS[i] ?? token.colorTextTertiary }}>
                        {i + 1}
                      </span>
                      <Avatar size={34} style={{ background: i < 3 ? RANK_COLORS[i] : token.colorPrimary, flexShrink: 0 }}>
                        {(entry.name || entry.email).slice(0, 1).toUpperCase()}
                      </Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text strong ellipsis style={{ display: "block" }}>
                          {entry.name || entry.email.split("@")[0]}
                          {isMe && <Text type="secondary"> (you)</Text>}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {entry.totalNotes} {Number(entry.totalNotes) === 1 ? "note" : "notes"}
                        </Text>
                      </div>
                      <Text strong style={{ whiteSpace: "nowrap" }}>
                        <StarFilled style={{ color: brand.gold, marginRight: 4 }} />
                        {Number(entry.avgRating).toFixed(1)}
                      </Text>
                    </div>
                  );
                })
              )}
            </Card>

            <Card
              title={
                <span>
                  <BookOutlined style={{ color: token.colorPrimary, marginRight: 8 }} />
                  Your modules
                </span>
              }
              extra={
                <Button type="link" size="small" onClick={() => navigate("/modules")}>
                  All modules
                </Button>
              }
            >
              {myModules.length === 0 ? (
                <Text type="secondary">Modules you write notes for will appear here.</Text>
              ) : (
                <Space size={[8, 8]} wrap>
                  {myModules.map(([code, count]) => (
                    <Tag
                      key={code}
                      color={moduleColor(code)}
                      bordered={false}
                      style={{ cursor: "pointer", padding: "4px 10px", fontSize: 13 }}
                      onClick={() => navigate(`/modules/${code}`)}
                    >
                      {MODULE_BY_CODE[code]?.name ?? code} · {count}
                    </Tag>
                  ))}
                </Space>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </PageLayout>
  );
};

export default Dashboard;
