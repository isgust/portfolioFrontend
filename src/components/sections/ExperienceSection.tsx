import { Calendar, Building2 } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";

const realExperiences = [
  {
    title: "Desenvolvedor Backend Java Jr",
    company: "AUTOBAHN",
    period: "Atual",
    description: "Desenvolvimento Back-end em Java 21 & Spring Boot, criação e evolução de APIs RESTful, POO e bancos de dados SQL.",
    current: true,
  },
  {
    title: "Residente - Desenvolvimento WEB",
    company: "BRISA",
    period: "Capacitação Tecnológica em TIC",
    description: "Atuação no programa de residência e capacitação em desenvolvimento de aplicações Web.",
    current: false,
  },
  {
    title: "Estagiário em Suporte HelpDesk",
    company: "SOFTCOM",
    period: "Suporte Técnico de Sistemas",
    description: "Atendimento técnico a sistemas, suporte de helpdesk e gestão de incidentes de TI.",
    current: false,
  },
];

const ExperienceSection = () => {
  return (
    <ShortsLayout sectionLabel="Minha Trajetória" sectionNumber={4} totalSections={6} sectionId="experiencia">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        <TechVideoBackground type="experiencia" />
        
        <div className="relative z-10 w-full flex flex-col items-center my-auto px-2">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest font-mono">Carreira & Atuação</span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-0.5 mb-4">
            Minha <span className="gradient-text">Trajetória</span>
          </h2>
          
          <div className="relative w-full text-left">
            {/* Timeline vertical bar */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent opacity-60" />
            
            <div className="space-y-3">
              {realExperiences.map((exp, index) => (
                <div 
                  key={index}
                  className="glass-card p-3 ml-7 relative hover:border-primary/50 transition-all duration-300"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[1.45rem] top-3.5 w-3 h-3 rounded-full border-2 border-background ${exp.current ? 'bg-primary animate-pulse' : 'bg-muted-foreground/60'}`} />
                  
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="text-xs font-bold font-display text-foreground">{exp.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
                        <Building2 className="w-3 h-3 text-primary" />
                        <span className="text-[11px] font-medium text-foreground/80">{exp.company}</span>
                      </div>
                    </div>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 text-primary rounded-full text-[9px] font-bold shrink-0">
                        Atual
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1 font-mono">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShortsLayout>
  );
};

export default ExperienceSection;
