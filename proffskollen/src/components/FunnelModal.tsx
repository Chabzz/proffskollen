import { useState } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle2, Check } from "lucide-react";
import { submitFunnel } from "@/lib/submitFunnel";

interface FunnelModalProps {
  category: string;
  onClose: () => void;
}

interface Step {
  title: string;
  options: string[];
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  description: string;
}

// ── Branching category config ─────────────────────────────
// Each category has a firstStep (sub-category picker) and
// tailored follow-up steps (subFlows) per option chosen.

interface CategoryConfig {
  firstStep: Step;
  subFlows: Record<string, Step[]>;
}

const categoryConfigs: Record<string, CategoryConfig> = {
  "Bygg & Renovering": {
    firstStep: {
      title: "Vad gäller projektet?",
      options: ["Renovering", "Nybyggnation", "Tillbyggnad", "Reparation"],
    },
    subFlows: {
      Renovering: [
        { title: "Vad ska renoveras?", options: ["Badrum", "Kök", "Hela bostaden", "Annat rum"] },
        { title: "Hur stort är projektet?", options: ["< 20 kvm", "20–50 kvm", "50–100 kvm", "100+ kvm"] },
        { title: "Vilken typ av bostad?", options: ["Lägenhet", "Villa", "Radhus", "Lokal/Kontor"] },
      ],
      Nybyggnation: [
        { title: "Vad ska byggas?", options: ["Hus/Villa", "Garage/Carport", "Attefallshus", "Kommersiell lokal"] },
        { title: "Hur stort är projektet?", options: ["< 50 kvm", "50–100 kvm", "100–200 kvm", "200+ kvm"] },
        { title: "Har du bygglov?", options: ["Ja", "Nej, behöver hjälp", "Ansökan skickad", "Vet ej"] },
      ],
      Tillbyggnad: [
        { title: "Vad ska byggas till?", options: ["Extra rum", "Balkong/Altan", "Våning/Vind", "Uterum/Inglasning"] },
        { title: "Hur stort är projektet?", options: ["< 15 kvm", "15–30 kvm", "30–50 kvm", "50+ kvm"] },
        { title: "Vilken typ av bostad?", options: ["Villa", "Radhus", "Lägenhet", "Annat"] },
      ],
      Reparation: [
        { title: "Vad behöver repareras?", options: ["Tak/Fasad", "Golv/Väggar", "Fuktskada", "Annat"] },
        { title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] },
        { title: "Vilken typ av bostad?", options: ["Lägenhet", "Villa", "Radhus", "Lokal/Kontor"] },
      ],
    },
  },
  VVS: {
    firstStep: {
      title: "Vad behöver du hjälp med?",
      options: ["Rörinstallation", "Värmesystem", "Badrumsrenovering", "Akut läcka/reparation"],
    },
    subFlows: {
      Rörinstallation: [
        { title: "Vad gäller installationen?", options: ["Nydraging av rör", "Flytt av rör", "Koppling av maskin", "Annat"] },
        { title: "I vilket rum?", options: ["Kök", "Badrum", "Tvättstuga", "Annat"] },
      ],
      Värmesystem: [
        { title: "Vad gäller värmesystemet?", options: ["Installation av värmepump", "Byte av radiator", "Golvvärme", "Service/Felsökning"] },
        { title: "Vilken typ av bostad?", options: ["Lägenhet", "Villa", "Radhus", "Lokal/Kontor"] },
      ],
      Badrumsrenovering: [
        { title: "Vad ska göras i badrummet?", options: ["Helrenovering", "Byte av kakel/klinker", "Ny dusch/badkar", "Byte av handfat/toalett"] },
        { title: "Hur stort är badrummet?", options: ["< 5 kvm", "5–10 kvm", "10+ kvm", "Vet ej"] },
      ],
      "Akut läcka/reparation": [
        { title: "Var sitter problemet?", options: ["Kök", "Badrum", "Källare/Teknikrum", "Vet ej"] },
        { title: "Hur akut är det?", options: ["Pågående läcka – nu", "Inom 24h", "Inom ett par dagar", "Bara offert"] },
      ],
    },
  },
  El: {
    firstStep: {
      title: "Vad behöver du hjälp med?",
      options: ["Nyinstallation", "Felsökning/Reparation", "Elcentral/Säkring", "Laddbox för elbil"],
    },
    subFlows: {
      Nyinstallation: [
        { title: "Vad ska installeras?", options: ["Belysning", "Eluttag/Strömbrytare", "Vitvaror/Maskin", "Annat"] },
        { title: "I vilken typ av utrymme?", options: ["Inne i bostaden", "Utomhus/Garage", "Lokal/Kontor", "Annat"] },
      ],
      "Felsökning/Reparation": [
        { title: "Vad är problemet?", options: ["Strömavbrott", "Defekt uttag/brytare", "Blinkande belysning", "Annat/Vet ej"] },
        { title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] },
      ],
      "Elcentral/Säkring": [
        { title: "Vad behöver göras?", options: ["Uppgradering av elcentral", "Byte av säkring", "Jordfelsbrytare", "Besiktning"] },
        { title: "Vilken typ av fastighet?", options: ["Lägenhet", "Villa", "Radhus", "Lokal/Kontor"] },
      ],
      "Laddbox för elbil": [
        { title: "Var ska laddboxen installeras?", options: ["Garagevägg", "Carport", "Utomhus vid parkering", "Annat"] },
        { title: "Har du 3-fas el?", options: ["Ja", "Nej", "Vet ej", "Behöver utredning"] },
      ],
    },
  },
  Städ: {
    firstStep: {
      title: "Vilken typ av städning?",
      options: ["Regelbunden städning", "Storstädning", "Flyttstäd", "Kontorsstäd"],
    },
    subFlows: {
      "Regelbunden städning": [
        { title: "Hur stort är utrymmet?", options: ["1–2 rum", "3–4 rum", "5+ rum", "Lokal/Kontor"] },
        { title: "Hur ofta behöver du hjälp?", options: ["Varje vecka", "Varannan vecka", "En gång i månaden", "Annat"] },
      ],
      Storstädning: [
        { title: "Vad ska storstädas?", options: ["Hela bostaden", "Kök & Badrum", "Specifika rum", "Lokal/Kontor"] },
        { title: "Hur stort är utrymmet?", options: ["1–2 rum", "3–4 rum", "5+ rum", "Stor lokal"] },
      ],
      Flyttstäd: [
        { title: "Hur stor är bostaden?", options: ["1–2 rum", "3–4 rum", "5+ rum", "Villa"] },
        { title: "När ska det vara klart?", options: ["Inom 3 dagar", "Inom en vecka", "Inom 2 veckor", "Flexibelt"] },
      ],
      Kontorsstäd: [
        { title: "Hur stort är kontoret?", options: ["< 100 kvm", "100–300 kvm", "300–500 kvm", "500+ kvm"] },
        { title: "Hur ofta behöver ni hjälp?", options: ["Dagligen", "Varje vecka", "Varannan vecka", "Engångstillfälle"] },
      ],
    },
  },
};

// Fallback for any other category
const defaultConfig: CategoryConfig = {
  firstStep: {
    title: "Vad behöver du hjälp med?",
    options: ["Nyinstallation", "Reparation", "Underhåll", "Annat"],
  },
  subFlows: {
    Nyinstallation: [{ title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] }],
    Reparation: [{ title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] }],
    Underhåll: [{ title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] }],
    Annat: [{ title: "Hur akut är det?", options: ["Akut – inom 24h", "Inom en vecka", "Ingen brådska", "Bara offert"] }],
  },
};

const FunnelModal = ({ category, onClose }: FunnelModalProps) => {
  const config = categoryConfigs[category] ?? defaultConfig;

  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [contact, setContact] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Build the active step list: firstStep + sub-flow based on first selection
  const firstSelection = selections[0];
  const subFlowSteps = firstSelection
    ? (config.subFlows[firstSelection] ?? [])
    : [];
  const allSteps = [config.firstStep, ...subFlowSteps];

  const totalSteps = allSteps.length + 1; // allSteps + contact step
  const isContactStep = currentStep === allSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentSelection = selections[currentStep];
  const step = allSteps[currentStep];

  const isContactValid =
    contact.name.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.description.trim();

  const handleSelect = (option: string) => {
    setSelections((prev) => {
      const updated = { ...prev, [currentStep]: option };
      // Changing the first step resets all downstream answers
      if (currentStep === 0 && prev[0] !== option) {
        Object.keys(prev).forEach((key) => {
          if (Number(key) > 0) delete updated[Number(key)];
        });
      }
      return updated;
    });
  };

  const handleNext = () => {
    if (currentStep < allSteps.length) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!isContactValid) return;
    setLoading(true);
    setError(null);

    const payload = {
      category,
      ...Object.fromEntries(
        allSteps.map((s, i) => [s.title, selections[i] ?? ""])
      ),
      ...contact,
    };

    const result = await submitFunnel(payload);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Något gick fel. Försök igen.");
    }
  };

  // ── Success screen ───────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
        <div className="bg-card rounded-2xl shadow-lg-custom w-full max-w-md p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <CheckCircle2 size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Din förfrågan är skickad!
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs">
            Vi matchar dig med{" "}
            <span className="text-foreground font-medium">kvalitetssäkrade företag</span>{" "}
            i ditt område och hör av oss inom kort.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Stäng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-lg-custom w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-3">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-5">
          {!isContactStep ? (
            /* ── Option selection steps ── */
            <>
              <p className="text-xs text-muted-foreground mb-1">
                Steg {currentStep + 1} av {totalSteps}
              </p>
              <h2 className="text-xl font-semibold text-foreground mb-5">
                {step.title}
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {step.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`p-3 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
                      currentSelection === option
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {currentSelection === option && (
                        <Check size={14} className="text-primary flex-shrink-0" />
                      )}
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                  Tillbaka
                </button>
                <button
                  onClick={handleNext}
                  disabled={!currentSelection}
                  className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium disabled:opacity-40 transition-opacity hover:opacity-90"
                >
                  Nästa
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          ) : (
            /* ── Contact + description step ── */
            <>
              <p className="text-xs text-muted-foreground mb-1">
                Steg {totalSteps} av {totalSteps} — Kontaktuppgifter
              </p>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Vem ska vi kontakta?
              </h2>

              {/* Summary of selections */}
              <div className="bg-muted/40 rounded-xl p-3 mb-4 space-y-1">
                {allSteps.map((s, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{s.title}</span>
                    <span className="font-medium text-foreground">{selections[i] ?? "—"}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <input
                  name="name"
                  type="text"
                  value={contact.name}
                  onChange={handleContactChange}
                  placeholder="Ditt namn *"
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  name="email"
                  type="email"
                  value={contact.email}
                  onChange={handleContactChange}
                  placeholder="E-postadress *"
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <input
                  name="phone"
                  type="tel"
                  value={contact.phone}
                  onChange={handleContactChange}
                  placeholder="Telefonnummer *"
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <textarea
                  name="description"
                  value={contact.description}
                  onChange={handleContactChange}
                  placeholder="Beskriv ditt projekt kort *"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!isContactValid || loading}
                className="mt-4 w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loading ? "Skickar…" : "Skicka förfrågan"}
              </button>

              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-3"
              >
                <ChevronLeft size={16} />
                Tillbaka
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunnelModal;
