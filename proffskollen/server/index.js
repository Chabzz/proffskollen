/**
 * MVP Backend – Express server
 *
 * Endpoints:
 *   POST /api/send-signup   → emails signup form data to team
 *   POST /api/send-funnel   → emails funnel form data to team
 *
 * All secrets live in .env (see .env.example).
 */

require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const nodemailer = require("nodemailer");

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors()); // tighten origins in production
app.use(express.json({ limit: "100kb" }));

// ── SMTP transporter (created once, reused) ──────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Helpers ──────────────────────────────────────────────

/**
 * Validate that the request body is a non-empty object.
 * Returns an error string or null if valid.
 */
function validateBody(body) {
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return "Request body must be a non-empty JSON object.";
  }
  return null;
}

/**
 * Send an email with the form data formatted as readable JSON.
 */
async function sendFormEmail(subject, formData) {
  const html = `
    <h2>${subject}</h2>
    <pre style="background:#f4f4f4;padding:16px;border-radius:8px;font-size:14px;">
${JSON.stringify(formData, null, 2)}
    </pre>
    <p style="color:#888;font-size:12px;">Sent by MVP Backend</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.TEAM_EMAIL,
    subject,
    html,
  });
}

// ── Routes ───────────────────────────────────────────────

/** Signup form submission */
app.post("/api/send-signup", async (req, res) => {
  const error = validateBody(req.body);
  if (error) return res.status(400).json({ success: false, error });

  try {
    await sendFormEmail("New Company Signup", req.body);
    return res.json({ success: true, message: "Signup data sent to team." });
  } catch (err) {
    console.error("Email error (signup):", err.message);
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

/** Funnel modal form submission */
app.post("/api/send-funnel", async (req, res) => {
  const error = validateBody(req.body);
  if (error) return res.status(400).json({ success: false, error });

  try {
    await sendFormEmail("New Funnel Submission", req.body);
    return res.json({ success: true, message: "Funnel data sent to team." });
  } catch (err) {
    console.error("Email error (funnel):", err.message);
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

/** Health check */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Start ────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
