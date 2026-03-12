import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "@/components/AuthModal";

const Navbar = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home page — just scroll to section
      const section = document.getElementById("how-it-works");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home, then scroll after page loads
      navigate("/#how-it-works");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">P</span>
              </div>
              <span className="font-semibold text-foreground tracking-tight">Placeholder</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="/#how-it-works"
              onClick={handleHowItWorks}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Hur det fungerar
            </a>
            <Link
              to="/for-foretag"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-foreground transition-colors"
            >
              För företag
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthMode("login")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Logga in
            </button>
            <Link
              to="/for-foretag"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-primary"
            >
              Anslut ditt företag
            </Link>
          </div>
        </div>
      </header>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={(m) => setAuthMode(m)}
        />
      )}
    </>
  );
};

export default Navbar;