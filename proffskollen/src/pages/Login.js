/**
 * Login Page
 *
 * Authenticates via Supabase Auth, then verifies the user exists
 * in the `companies` table (i.e. has been manually approved).
 *
 * Drop this into your router or replace your existing login page.
 * Styling uses inline styles so it matches any project without
 * extra CSS dependencies – swap for your own classes as needed.
 */

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Sign in with Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        return;
      }

      // 2. Check the companies table for a verified row
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("id, status")
        .eq("user_id", authData.user.id)
        .single();

      if (companyError || !company) {
        // User exists in Auth but not in companies → not approved
        await supabase.auth.signOut();
        setError("Your account has not been verified yet. Please contact support.");
        return;
      }

      if (company.status !== "verified") {
        await supabase.auth.signOut();
        setError("Your account is pending verification.");
        return;
      }

      // 3. Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Log In</h1>
        <p style={styles.subtitle}>Access your company dashboard</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Inline styles (replace with your own design system) ── */
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2.5rem",
    maxWidth: "420px",
    width: "100%",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  subtitle: {
    color: "#666",
    margin: "0.25rem 0 1.5rem",
    fontSize: "0.95rem",
  },
  error: {
    background: "#fef2f2",
    color: "#b91c1c",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9rem",
    fontWeight: 500,
    gap: "0.3rem",
  },
  input: {
    padding: "0.65rem 0.75rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};
