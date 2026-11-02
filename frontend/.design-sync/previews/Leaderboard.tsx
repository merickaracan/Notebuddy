import { Leaderboard } from "notebuddy-ui";

// Leaderboard loads /api/notes/leaderboard; answer with sample rows so the card shows real content.
const sample = [
  { name: "Ava Thompson", email: "at2201@bath.ac.uk", avgRating: 4.8, totalNotes: 14 },
  { name: "Leo Martins", email: "lm612@bath.ac.uk", avgRating: 4.6, totalNotes: 11 },
  { name: "Sofia Novak", email: "sn25@bath.ac.uk", avgRating: 4.3, totalNotes: 9 },
  { name: "Omar Haddad", email: "oh48@bath.ac.uk", avgRating: 4.1, totalNotes: 7 },
  { name: "Grace Liu", email: "gl2290@bath.ac.uk", avgRating: 3.9, totalNotes: 6 },
  { name: "Priya Shah", email: "ps881@bath.ac.uk", avgRating: 3.7, totalNotes: 4 },
];
const realFetch = window.fetch.bind(window);
window.fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
  String(input).includes("/api/notes/leaderboard")
    ? Promise.resolve(new Response(JSON.stringify({ data: sample }), { headers: { "Content-Type": "application/json" } }))
    : realFetch(input, init)) as typeof window.fetch;

export const Full = () => <Leaderboard />;

export const TopFive = () => <Leaderboard limit={5} />;
