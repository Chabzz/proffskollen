const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface SignupForm {
  companyName: string;
  name: string;
  industry: string;
  email: string;
}

interface SubmitResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitSignup(formData: SignupForm): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/api/send-signup`, {
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