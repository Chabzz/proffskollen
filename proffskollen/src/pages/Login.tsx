import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        return;
      }

      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("id, status")
        .eq("user_id", authData.user.id)
        .single();

      if (companyError || !company) {
        await supabase.auth.signOut();
        setError("Ditt konto har inte verifierats ännu. Kontakta support.");
        return;
      }

      if (company.status !== "verified") {
        await supabase.auth.signOut();
        setError("Ditt konto väntar på verifiering.");
        return;
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setError("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">P</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">Proffskollen</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Välkommen tillbaka</h1>
          <p className="text-sm text-muted-foreground mt-1">Logga in på ditt företagskonto</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              E-postadress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="din@foretag.se"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ditt lösenord"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {loading ? "Loggar in…" : "Logga in"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Inget konto?{" "}
          <Link to="/for-foretag" className="text-primary font-medium hover:opacity-80 transition-opacity">
            Ansök här
          </Link>
        </p>
      </div>
    </div>
  );
}