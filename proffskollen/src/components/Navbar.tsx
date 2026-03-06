import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "@/components/AuthModal";

const Navbar = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">P</span>
              </div>
              <span className="font-semibold text-foreground tracking-tight">Placeholder</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">Hur det fungerar</a>
            <Link to="/for-foretag" className="hover:text-foreground transition-colors">För företag</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Logga in
            </Link>
            <Link
              to="/for-foretag"
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

