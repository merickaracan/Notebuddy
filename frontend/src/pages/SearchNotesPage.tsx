import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Row, Col, Typography, Card, Tag, Empty, Spin, Input, Button, message, Rate, Drawer, Select, Switch, Divider, Badge } from "antd";
import { SearchOutlined, SafetyCertificateOutlined, FilterOutlined } from "@ant-design/icons";
import PageLayout from "../components/PageHeader";
import { useTheme } from "../components/ThemeContext";
import { searchNotes } from "../api/notes";
import { AVAILABLE_MODULES } from "../components/Modules";

const { Title, Text } = Typography;
const { Content } = Layout;

interface Note {
  id: string;
  owner_id: number;
  owner_email: string;
  title: string;
  note_data: string;
  module: string;
  is_verified: number;
  rating_average: number;
  number_ratings: number;
  created_at: string;
  updated_at: string;
}

type SortOption = "default" | "highest_rated" | "lowest_rated" | "most_ratings";

const MODULE_LABELS: Record<string, string> = Object.fromEntries(
  AVAILABLE_MODULES.map((m) => [m.code.toUpperCase(), m.name])
);

const SearchNotesPage: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isLecturer, setIsLecturer] = useState(false);
  const [verifyingNoteId, setVerifyingNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [titleFilter, setTitleFilter] = useState<string>(searchParams.get("q") ?? "");
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const activeFilterCount = (sortBy !== "default" ? 1 : 0) + (verifiedOnly ? 1 : 0) + (selectedModule ? 1 : 0);

  const displayedNotes = useMemo(() => {
    let result = [...notes];
    if (verifiedOnly) result = result.filter((n) => Number(n.is_verified) === 1);
    if (selectedModule) result = result.filter((n) => n.module.toUpperCase() === selectedModule.toUpperCase());
    if (sortBy === "highest_rated") result.sort((a, b) => Number(b.rating_average) - Number(a.rating_average));
    else if (sortBy === "lowest_rated") result.sort((a, b) => Number(a.rating_average) - Number(b.rating_average));
    else if (sortBy === "most_ratings") result.sort((a, b) => Number(b.number_ratings) - Number(a.number_ratings));
    return result;
  }, [notes, sortBy, verifiedOnly, selectedModule]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await searchNotes(titleFilter, authorFilter);
      if (response.ok && response.data) {
        const notesData = Array.isArray(response.data) ? response.data : [];
        setNotes(notesData);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error searching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [titleFilter, authorFilter]);

  useEffect(() => {
    // Load all notes initially
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      const stored = localStorage.getItem("user");
      const user = stored ? JSON.parse(stored) : null;

      if (!user?.email) {
        setIsLecturer(false);
        return;
      }

      if (user.email === "admin" || user.role === "teacher") {
        setIsLecturer(true);
        return;
      }

      try {
        const response = await fetch(`/api/users/${encodeURIComponent(user.email)}`, {
          credentials: "include",
        });
        const data = await response.json();
        const userData = data?.ok && Array.isArray(data.data) ? data.data[0] : null;
        setIsLecturer(Number(userData?.lecturer ?? 0) === 1);
      } catch {
        setIsLecturer(false);
      }
    };

    fetchCurrentUserRole();
  }, []);

  const handleVerifyToggle = async (noteId: string, currentlyVerified: number) => {
    const endpoint = Number(currentlyVerified) === 1 ? `/api/notes/unverify/${noteId}` : `/api/notes/verify/${noteId}`;

    try {
      setVerifyingNoteId(noteId);
      const response = await fetch(endpoint, {
        method: "PUT",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok || !data?.ok) {
        message.error(data?.error || data?.message || "Failed to update verification status");
        return;
      }

      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? { ...note, is_verified: Number(note.is_verified) === 1 ? 0 : 1 }
            : note
        )
      );
      message.success(Number(currentlyVerified) === 1 ? "Note marked as unverified" : "Note marked as teacher verified");
    } catch {
      message.error("Failed to update verification status");
    } finally {
      setVerifyingNoteId(null);
    }
  };

  return (
    <PageLayout>
      <Content style={{ padding: "32px" }}>
        <section>
          <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SearchOutlined style={{ fontSize: 26, color: isDark ? "#4da3ff" : "#0b5ed7", marginRight: 12 }} />
              <Title level={2} style={{ margin: 0 }}>Search Notes</Title>
            </div>
            <Badge count={activeFilterCount} size="small">
              <Button
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerOpen(true)}
                size="large"
                style={{ borderRadius: 8 }}
              >
                Filter
              </Button>
            </Badge>
          </Row>

          <Drawer
            title="Filter Notes"
            placement="right"
            open={filterDrawerOpen}
            onClose={() => setFilterDrawerOpen(false)}
            width={300}
            styles={{ body: { background: isDark ? "#141414" : "#fff" }, header: { background: isDark ? "#141414" : "#fff", borderBottom: isDark ? "1px solid #303030" : undefined } }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>Sort by</Text>
                <Select
                  value={sortBy}
                  onChange={(v) => setSortBy(v)}
                  style={{ width: "100%" }}
                  options={[
                    { value: "default",       label: "Default" },
                    { value: "highest_rated", label: "Highest Rated" },
                    { value: "lowest_rated",  label: "Lowest Rated" },
                    { value: "most_ratings",  label: "Most Ratings" },
                  ]}
                />
              </div>
              <Divider style={{ margin: 0, borderColor: isDark ? "#303030" : undefined }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text strong>Teacher Verified only</Text>
                <Switch checked={verifiedOnly} onChange={setVerifiedOnly} />
              </div>
              <Divider style={{ margin: 0, borderColor: isDark ? "#303030" : undefined }} />
              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>Module</Text>
                <Select
                  allowClear
                  placeholder="All modules"
                  value={selectedModule}
                  onChange={(v) => setSelectedModule(v ?? null)}
                  style={{ width: "100%" }}
                  showSearch
                  optionFilterProp="label"
                  options={AVAILABLE_MODULES.map((m) => ({ value: m.code, label: `${m.code} — ${m.name}` }))}
                />
              </div>
              <Divider style={{ margin: 0, borderColor: isDark ? "#303030" : undefined }} />
              <Button
                onClick={() => { setSortBy("default"); setVerifiedOnly(false); setSelectedModule(null); }}
                disabled={activeFilterCount === 0}
                style={{ borderRadius: 8 }}
              >
                Clear Filters
              </Button>
            </div>
          </Drawer>

          {/* Search Filters */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15,35,95,0.08)",
              border: isDark ? "1px solid #303030" : undefined,
              background: isDark ? "#1f1f1f" : "#fff",
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <div>
                  <Text strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
                    Title
                  </Text>
                  <Input
                    placeholder="Search by note title..."
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    onPressEnter={handleSearch}
                    style={{ borderRadius: 8 }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div>
                  <Text strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
                    Author Email
                  </Text>
                  <Input
                    placeholder="Search by author email..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    onPressEnter={handleSearch}
                    style={{ borderRadius: 8 }}
                  />
                </div>
              </Col>
            </Row>
          </Card>

          {/* Notes Display */}
          {displayedNotes.length === 0 && !loading ? (
            <Empty description={titleFilter || authorFilter || activeFilterCount > 0 ? "No notes found matching your search or filters." : "No notes available."} style={{ marginTop: 48 }} />
          ) : (
            <Spin spinning={loading} description="Searching notes...">
              <Row gutter={[16, 16]}>
                {displayedNotes.map((note) => (
                  <Col xs={24} sm={12} md={8} key={note.id}>
                    <Card
                      hoverable
                      onClick={() => navigate(`/note/${note.id}`)}
                      style={{
                        borderRadius: 12,
                        boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15,35,95,0.08)",
                        border: isDark ? "1px solid #303030" : undefined,
                        background: isDark ? "#1f1f1f" : "#fff",
                        minHeight: 180,
                        cursor: "pointer",
                      }}
                    >
                      <Title level={5} style={{ marginBottom: 6 }}>
                        {note.title}
                      </Title>
                      {Number(note.is_verified) === 1 && (
                        <Tag
                          color="green"
                          icon={<SafetyCertificateOutlined />}
                          style={{ borderRadius: 6, marginBottom: 8 }}
                        >
                          Teacher Verified
                        </Tag>
                      )}
                      <Tag color="blue" style={{ borderRadius: 6, marginBottom: 8 }}>
                        {MODULE_LABELS[note.module] ?? note.module}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
                        by {note.owner_email}
                      </Text>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <Rate disabled allowHalf value={Number(note.rating_average)} style={{ fontSize: 13 }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {Number(note.rating_average) > 0
                            ? `${Number(note.rating_average).toFixed(1)} (${note.number_ratings})`
                            : "No ratings yet"}
                        </Text>
                      </div>
                      {isLecturer && (
                        <Button
                          type={Number(note.is_verified) === 1 ? "default" : "primary"}
                          size="small"
                          icon={<SafetyCertificateOutlined />}
                          loading={verifyingNoteId === note.id}
                          style={{ marginTop: 12, borderRadius: 6 }}
                          onClick={(event) => {
                            event.stopPropagation();
                            void handleVerifyToggle(note.id, Number(note.is_verified));
                          }}
                        >
                          {Number(note.is_verified) === 1 ? "Unverify" : "Verify"}
                        </Button>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Spin>
          )}
        </section>
      </Content>
    </PageLayout>
  );
};

export default SearchNotesPage;
