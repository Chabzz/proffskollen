/**
 * Dashboard Page (placeholder)
 *
 * Fetches the logged-in user's company info from Supabase
 * and displays company name + email. Includes logout button.
 *
 * If no session or no company row → redirect to /login.
 */

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      // 1. Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      // 2. Fetch company row
      const { data, error } = await supabase
        .from("companies")
        .select("company_name, email, status")
        .eq("user_id", session.user.id)
        .single();

      if (error || !data) {
        // Not a verified company – sign out and redirect
        await supabase.auth.signOut();
        window.location.href = "/login";
        return;
      }

      setCompany(data);
      setLoading(false);
    }

    loadCompany();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Log Out
          </button>
        </div>

        <div style={styles.info}>
          <div style={styles.row}>
            <span style={styles.label}>Company</span>
            <span style={styles.value}>{company.company_name}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Email</span>
            <span style={styles.value}>{company.email}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Status</span>
            <span style={{ ...styles.badge, background: "#dcfce7", color: "#166534" }}>
              {company.status}
            </span>
          </div>
        </div>

        <p style={styles.placeholder}>
          This is a placeholder dashboard. Replace this section with your actual content.
        </p>
      </div>
    </div>
  );
}

/* ── Inline styles (replace with your own design system) ── */
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem 1rem",
    minHeight: "100vh",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2.5rem",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    height: "fit-content",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: { margin: 0, fontSize: "1.5rem", fontWeight: 700 },
  logoutBtn: {
    padding: "0.5rem 1rem",
    background: "#f3f4f6",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 0",
    borderBottom: "1px solid #eee",
  },
  label: { fontWeight: 500, color: "#666", fontSize: "0.9rem" },
  value: { fontWeight: 600, fontSize: "0.95rem" },
  badge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  placeholder: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
};
