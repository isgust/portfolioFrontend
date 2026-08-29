import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experiência" },
  { id: "projects", label: "Projetos" },
  { id: "contact", label: "Contato" },
];

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map((s) => document.getElementById(s.id));
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center p-2 -m-2 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none transition-all"
          aria-label={`Ir para a seção ${section.label}`}
        >
          <span className="absolute right-10 px-3 py-1 bg-card/90 backdrop-blur-md rounded-lg text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/60 shadow-lg pointer-events-none">
            {section.label}
          </span>
          <span 
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
          />
        </button>
      ))}
    </nav>
  );
};

export default NavigationDots;
