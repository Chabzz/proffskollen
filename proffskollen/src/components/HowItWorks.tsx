import { FileText, Zap, BarChart3 } from "lucide-react";

const howSteps = [
  {
    icon: FileText,
    step: "01",
    title: "Beskriv ditt behov",
    desc: "Fyll i vad du behöver hjälp med via vår enkla guide. Det tar bara ett par minuter.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Vi matchar dig",
    desc: "Vår plattform kopplar dig automatiskt med relevanta, verifierade företag i ditt område.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Ta emot & jämför",
    desc: "Få offerter direkt i inkorgen. Välj det erbjudande som passar dig bäst.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Processen
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Enkelt som tre steg
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howSteps.map(({ icon: Icon, step, title, desc }, i) => (
            <div key={i} className="relative group flex">
              {/* Connector line */}
              {i < howSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              <div className="relative z-10 bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 flex flex-col w-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-4xl font-bold text-muted/50 font-serif leading-none mt-1">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
