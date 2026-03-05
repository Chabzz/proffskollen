import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

const AuthModal = ({ mode, onClose, onSwitchMode }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";
  const isValid = isLogin
    ? form.email && form.password
    : form.name && form.email && form.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-lg-custom w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Placeholder
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mt-1">
              {isLogin ? "Välkommen tillbaka" : "Anslut ditt företag"}
            </h2>
            {!isLogin && (
              <p className="text-sm text-muted-foreground mt-1">
                Kom igång gratis – inga dolda avgifter.
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                Företagsnamn
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Ditt företagsnamn"
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              E-postadress
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="din@email.se"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Lösenord
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder={isLogin ? "Ditt lösenord" : "Minst 8 tecken"}
                className="w-full px-3 py-2.5 pr-10 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            disabled={!isValid}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:opacity-90 transition-opacity disabled:opacity-40 mt-1"
          >
            {isLogin ? "Logga in" : "Skapa gratis konto"}
          </button>

          {isLogin && (
            <p className="text-center text-xs text-muted-foreground">
              <button className="hover:text-foreground underline underline-offset-2 transition-colors">
                Glömt lösenordet?
              </button>
            </p>
          )}
        </div>

        <div className="px-5 pb-5 pt-0">
          <div className="border-t border-border/60 pt-4 text-center text-sm text-muted-foreground">
            {isLogin ? "Inget konto?" : "Har du redan ett konto?"}{" "}
            <button
              onClick={() => onSwitchMode(isLogin ? "signup" : "login")}
              className="text-primary font-medium hover:opacity-80 transition-opacity"
            >
              {isLogin ? "Skapa gratis konto" : "Logga in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
