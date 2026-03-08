const API_BASE = import.meta.env.VITE_API_URL || "";

interface FunnelForm {
  [key: string]: string | number | boolean;
}

interface SubmitResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitFunnel(formData: FunnelForm): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/api/send-funnel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Request failed." };
    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, error: "Network error. Please try again." };
  }
}