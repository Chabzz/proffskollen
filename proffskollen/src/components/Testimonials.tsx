import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anna Lindström",
    location: "Stockholm",
    text: "Fantastisk service! Jag fick tre offerter inom en dag och hittade ett perfekt byggföretag för min badrumsrenovering. Sparade både tid och pengar.",
    rating: 5,
    initials: "AL",
    color: "bg-primary-light text-primary",
  },
  {
    name: "Erik Johansson",
    location: "Göteborg",
    text: "Enkelt och smidigt. Behövde hjälp med el-installation och fick snabbt kontakt med en kompetent elektriker. Rekommenderar varmt!",
    rating: 5,
    initials: "EJ",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    name: "Sara Bergström",
    location: "Malmö",
    text: "Äntligen en tjänst som faktiskt håller vad den lovar. Verifierade företag, inga konstiga avgifter och riktigt bra matchning för min trädgård.",
    rating: 5,
    initials: "SB",
    color: "bg-muted text-muted-foreground",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Kundrecensioner
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Vad våra kunder säger
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ name, location, text, rating, initials, color }, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-lg-custom hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                "{text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
