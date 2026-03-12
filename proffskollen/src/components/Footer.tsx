const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">P</span>
              </div>
              <span className="font-semibold text-background tracking-tight">Proffskollen</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs opacity-70">
              Vi gör det enklare att hitta rätt företag för rätt jobb.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
              Företag
            </h4>
            <ul className="space-y-2.5">
              {["Om oss", "Kontakt", "För företag", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-background transition-colors opacity-70 hover:opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
              Juridik
            </h4>
            <ul className="space-y-2.5">
              {["Integritetspolicy", "Villkor", "Cookies"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-background transition-colors opacity-70 hover:opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Proffskollen. Alla rättigheter förbehålls.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
