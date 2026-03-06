import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Company {
  company_name: string;
  email: string;
  status: string;
}

export default function Dashboard() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("companies")
        .select("company_name, email, status")
        .eq("user_id", session.user.id)
        .single();

      if (error || !data) {
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Laddar…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Välkommen tillbaka, {company?.company_name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            Logga ut
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Företagsinformation
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Företagsnamn</p>
              <p className="text-sm font-medium text-foreground">{company?.company_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">E-post</p>
              <p className="text-sm font-medium text-foreground">{company?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                {company?.status}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Detta är en platshållardashboard – ersätt med ditt eget innehåll.
        </p>
      </div>
    </div>
  );
}