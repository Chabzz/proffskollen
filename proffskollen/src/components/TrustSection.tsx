import { ShieldCheck, Gift, EyeOff, Clock } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Endast verifierade företag",
    desc: "Alla företag granskas och godkänns manuellt av vårt team.",
  },
  {
    icon: Gift,
    title: "Gratis att använda",
    desc: "Det kostar aldrig dig som konsument något att använda tjänsten.",
  },
  {
    icon: EyeOff,
    title: "Inga dolda avgifter",
    desc: "Fullständig transparens – du vet alltid vad du betalar för.",
  },
];

const TrustSection = () => {
  return (
    <section id="trust" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Trygghet
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Byggt på förtroende
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
