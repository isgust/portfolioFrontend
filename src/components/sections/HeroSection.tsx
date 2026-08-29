import { ChevronDown, Github, Linkedin, Mail, Code2, Terminal, Cpu } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";

const HeroSection = () => {
  return (
    <ShortsLayout sectionLabel="Desenvolvedor Backend Java / Web" sectionNumber={1} totalSections={6} sectionId="hero">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        {/* Animated Tech Background */}
        <TechVideoBackground type="hero" />

        <div className="relative z-10 flex flex-col items-center w-full my-auto text-center px-4">
          {/* Animated Tech Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6 animate-fade-in shadow-glow">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>Java & Spring Boot Specialist</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold font-display mb-1 animate-slide-up tracking-tight">
            Olá, eu sou
          </h1>
          <h2 className="text-4xl md:text-5xl font-black font-display mb-4 animate-slide-up delay-100">
            <span className="gradient-text">Gustavo Rocha</span>
          </h2>

          <p className="text-xs md:text-sm text-foreground/90 max-w-xs mb-6 animate-slide-up delay-200 font-body leading-relaxed">
            Desenvolvedor BackEnd Java Jr na <strong className="text-primary font-bold">AutoBahn</strong>
            <br />
            Engenharia da Computação na <span className="text-foreground font-semibold">UFMA</span> • São Luís, MA
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 animate-slide-up delay-300">
            <span className="px-2.5 py-1 rounded-lg bg-card/80 border border-primary/40 text-primary text-[11px] font-mono flex items-center gap-1">
              <Code2 className="w-3 h-3" /> Java / Spring Boot
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-card/80 border border-accent/40 text-accent text-[11px] font-mono flex items-center gap-1">
              <Cpu className="w-3 h-3" /> REST APIs
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-card/80 border border-border/50 text-muted-foreground text-[11px] font-mono">
              MySQL / SQL
            </span>
          </div>

          {/* Social / Contact Links */}
          <div className="flex items-center gap-4 animate-slide-up delay-400">
            <a 
              href="https://github.com/isgust" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/gustavosilvrocha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:rocha.gustavops@gmail.com"
              className="p-3 glass-card hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="relative z-10 animate-float pt-2">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-widest font-mono">Deslize para ver perfil</span>
            <ChevronDown className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </ShortsLayout>
  );
};

export default HeroSection;
