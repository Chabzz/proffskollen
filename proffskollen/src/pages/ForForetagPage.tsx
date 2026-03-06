import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Shield, Zap, Users, TrendingUp, Star, ArrowRight } from "lucide-react";
import { submitSignup } from "@/lib/submitSignup";

const benefits = [
  {
    icon: Users,
    title: "Nå rätt kunder",
    description:
      "Vi matchar dig med kunder som aktivt söker efter just din tjänst – inga kalla leads.",
  },
  {
    icon: Shield,
    title: "Kvalitetsstämpel",
    description:
      "Genom vår verifieringsprocess får du en tydlig kvalitetsstämpel som bygger förtroende hos kunderna.",
  },
  {
    icon: Zap,
    title: "Snabb matchning",
    description:
      "Få förfrågningar direkt när en kund beskriver ett behov som matchar ditt erbjudande.",
  },
  {
    icon: TrendingUp,
    title: "Väx din verksamhet",
    description:
      "Fokusera på jobbet – vi tar hand om kundflödet så att du kan skala utan extra marknadsföringskostnader.",
  },
];

const testimonials = [
  {
    name: "Mikael Lindgren",
    company: "ML Bygg & Renovering",
    text: "Sedan vi anslöt oss har vi tredubblat vår omsättning från nya kunder. Matchningarna är relevanta och kunderna är seriösa.",
    stars: 5,
  },
  {
    name: "Sara Johansson",
    company: "Johansson El AB",
    text: "Processen för att komma igång var enkel och supporten var utmärkt. Rekommenderar verkligen Placeholder.",
    stars: 5,
  },
];

const industries = [
  "Bygg & Renovering",
  "El",
  "VVS",
  "Trädgård & Utemiljö",
  "Städ & Rengöring",
  "Flytt",
  "Måleri",
  "Snickeri",
  "Tak",
  "Annat",
];

const ForForetagPage = () => {
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    industry: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    form.companyName.trim() &&
    form.name.trim() &&
    form.industry &&
    form.email.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isValid) return;
  setLoading(true);
  setError(null);
  
  const result = await submitSignup(form);
  
  if (result.success) {
    setSubmitted(true);
  } else {
    setError(result.error || "Något gick fel. Försök igen.");
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 bg-gradient-to-b from-surface to-background">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
            För företag
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
            Anslut ditt företag till{" "}
            <span className="text-primary">Placeholder</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Vi kvalitetssäkrar varje företag manuellt. Fyll i formuläret nedan
            så hör vi av oss inom 1–2 arbetsdagar.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-lg-custom animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Tack för din ansökan!
              </h2>
              <p className="text-muted-foreground text-sm">
                Vi granskar din ansökan och återkommer till{" "}
                <span className="font-medium text-foreground">{form.email}</span>{" "}
                inom 1–2 arbetsdagar.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity"
              >
                Tillbaka till startsidan <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-lg-custom overflow-hidden">
              <div className="p-6 border-b border-border/60">
                <h2 className="text-xl font-semibold text-foreground">
                  Ansök om att bli partner
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Alla ansökningar granskas manuellt av vårt team.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Bolagsnamn <span className="text-primary">*</span>
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Ditt AB"
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Kontaktperson <span className="text-primary">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Förnamn Efternamn"
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    Bransch <span className="text-primary">*</span>
                  </label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                  >
                    <option value="" disabled>
                      Välj bransch…
                    </option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                    E-postadress <span className="text-primary">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="din@foretag.se"
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-primary hover:opacity-90 transition-opacity disabled:opacity-40 mt-2 flex items-center justify-center gap-2"
                >
                  Skicka ansökan <ArrowRight size={15} />
                </button>

                <p className="text-center text-xs text-muted-foreground pt-1">
                  Inga förpliktelser – vi hör av oss om det är en bra match.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 bg-surface border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Varför ansluta till Placeholder?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tusentals kunder söker aktivt efter pålitliga företag varje vecka.
              Bli synlig för rätt person vid rätt tillfälle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-card border border-border rounded-2xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <b.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Vad våra partners säger
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">
            Redo att växa?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Ansök idag och bli en del av Sveriges snabbast växande
            matchningsplattform för hantverkstjänster.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 bg-primary-foreground text-primary rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Ansök nu – det är gratis
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForForetagPage;
