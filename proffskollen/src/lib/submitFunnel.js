/**
 * Submit funnel modal form data to the backend.
 *
 * Usage (attach to your existing form handler):
 *
 *   import { submitFunnel } from "../lib/submitFunnel";
 *
 *   async function handleSubmit(e) {
 *     e.preventDefault();
 *     const formData = { name, budget, needs, ... };
 *     const result = await submitFunnel(formData);
 *     if (result.success) { // show success } else { // show error }
 *   }
 */

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function submitFunnel(formData) {
  try {
    const res = await fetch(`${API_BASE}/api/send-funnel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || "Request failed." };
    }

    return { success: true, message: data.message };
  } catch (err) {
    console.error("submitFunnel error:", err);
    return { success: false, error: "Network error. Please try again." };
  }
}
