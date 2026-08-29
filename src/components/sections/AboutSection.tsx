import { MapPin, GraduationCap, Briefcase, Award } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";

const AboutSection = () => {
  return (
    <ShortsLayout sectionLabel="Sobre Mim" sectionNumber={2} totalSections={6} sectionId="sobre">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        <TechVideoBackground type="sobre" />
        
        <div className="relative z-10 w-full flex flex-col items-center my-auto px-2">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest font-mono">Perfil Profissional</span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-0.5 mb-4">
            Quem sou <span className="gradient-text">eu?</span>
          </h2>

          <div className="glass-card p-4 mb-4 text-left w-full border-l-4 border-l-primary shadow-xl backdrop-blur-md">
            <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-body">
              Estudante de <strong className="text-primary font-semibold">Engenharia da Computação na UFMA</strong> com experiência em lógica de programação e <strong className="text-accent font-semibold">Desenvolvimento Back-end</strong>.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Possuo domínio da sintaxe Java e POO, com conhecimento em Spring Boot, buscando aplicar essa base na criação e evolução de APIs RESTful e modelagem de dados SQL (MySQL).
            </p>
          </div>
          
          <div className="space-y-2.5 w-full">
            <div className="glass-card p-3 flex items-center gap-3 hover:border-primary/50 transition-colors">
              <div className="p-2 rounded-xl bg-primary/20 shrink-0 text-primary">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-muted-foreground font-mono">Formação Acadêmica</p>
                <p className="text-xs font-semibold text-foreground truncate">UFMA — Engenharia da Computação</p>
                <p className="text-[10px] text-muted-foreground">Previsão de Conclusão em 2026 (Noturno)</p>
              </div>
            </div>

            <div className="glass-card p-3 flex items-center gap-3 hover:border-accent/50 transition-colors">
              <div className="p-2 rounded-xl bg-accent/20 shrink-0 text-accent">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-muted-foreground font-mono">Atuação Profissional</p>
                <p className="text-xs font-semibold text-foreground truncate">Desenvolvedor Backend Java Jr @ AutoBahn</p>
                <p className="text-[10px] text-muted-foreground">Residente Web (BRISA) • Suporte (Softcom)</p>
              </div>
            </div>
            
            <div className="glass-card p-3 flex items-center gap-3 hover:border-primary/50 transition-colors">
              <div className="p-2 rounded-xl bg-primary/20 shrink-0 text-primary">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-muted-foreground font-mono">Cursos & Certificações</p>
                <p className="text-xs font-semibold text-foreground truncate">SENAC — Técnico Informática (2024) & Prog. Sistemas (2023)</p>
                <p className="text-[10px] text-muted-foreground">IEMA — Manutenção e Suporte de Computadores (2016)</p>
              </div>
            </div>

            <div className="glass-card p-2.5 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-secondary shrink-0 text-muted-foreground">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-mono">Localização</p>
                <p className="text-xs font-medium text-foreground">São Luís, Maranhão — Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShortsLayout>
  );
};

export default AboutSection;
