import { useState } from "react";
import { Search, Hammer, Zap, Droplets, Leaf, Sparkles, Truck } from "lucide-react";
import CategoryButton from "@/components/CategoryButton";
import FunnelModal from "@/components/FunnelModal";
import heroBg from "@/assets/hero-bg.jpg";

const categories = [
  { icon: Hammer, label: "Bygg & Renovering" },
  { icon: Zap, label: "El" },
  { icon: Droplets, label: "VVS" },
  { icon: Sparkles, label: "Städ" },
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategory = (label: string) => {
    setActiveCategory(label);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background image with subtle overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroBg}
            alt="Skandinavisk hem"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Redan 2 400+ nöjda kunder
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 text-balance leading-tight">
            Vad behöver du{" "}
            <span className="gradient-text italic">hjälp med?</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
            Beskriv ditt projekt – vi matchar dig med rätt lokala företag på några minuter.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(({ icon, label }) => (
              <CategoryButton
                key={label}
                icon={icon}
                label={label}
                active={activeCategory === label}
                onClick={() => handleCategory(label)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Funnel modal */}
      {activeCategory && (
        <FunnelModal
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </>
  );
};

export default HeroSection;
