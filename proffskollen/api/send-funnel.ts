import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  const body = req.body;
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return res.status(400).json({ success: false, error: "Request body must be a non-empty JSON object." });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.TEAM_EMAIL,
      subject: "New Funnel Submission",
      html: `
        <h2>New Funnel Submission</h2>
        <pre style="background:#f4f4f4;padding:16px;border-radius:8px;font-size:14px;">
${JSON.stringify(body, null, 2)}
        </pre>
        <p style="color:#888;font-size:12px;">Sent by Proffskollen</p>
      `,
    });
    return res.status(200).json({ success: true, message: "Funnel data sent to team." });
  } catch (err: any) {
    console.error("Email error (funnel):", err.message);
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }
}