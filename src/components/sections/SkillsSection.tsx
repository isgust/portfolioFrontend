import { Code2, Database, Layout, Wrench } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";

const skillCategories = [
  {
    title: "Backend & Core",
    icon: Code2,
    color: "primary",
    skills: [
      { name: "Java (Spring Boot / POO)", level: 85 },
      { name: "APIs RESTful & Arquitetura", level: 82 },
      { name: "Estruturas de Dados & Lógica", level: 78 },
    ],
  },
  {
    title: "Bancos de Dados & SQL",
    icon: Database,
    color: "accent",
    skills: [
      { name: "MySQL & Spring Data JPA", level: 80 },
      { name: "SQL & Modelagem Relacional", level: 76 },
    ],
  },
  {
    title: "Frontend Web",
    icon: Layout,
    color: "primary",
    skills: [
      { name: "HTML5, CSS3 & JavaScript", level: 78 },
      { name: "React & Tailwind CSS", level: 72 },
    ],
  },
];

const tools = [
  "Git & GitHub", "Spring Boot", "Suporte & HelpDesk", "Processos de Software", "Arquitetura REST"
];

const SkillsSection = () => {
  return (
    <ShortsLayout sectionLabel="Minhas Habilidades" sectionNumber={3} totalSections={6} sectionId="skills">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        <TechVideoBackground type="skills" />

        <div className="relative z-10 w-full flex flex-col items-center my-auto px-2">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest font-mono">Competências</span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-0.5 mb-5">
            Habilidades <span className="gradient-text">Técnicas</span>
          </h2>

          <div className="space-y-3 w-full">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="glass-card p-3 text-left">
                  <h3 className="text-xs font-bold font-display mb-2 flex items-center gap-2 text-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {cat.title}
                  </h3>
                  <div className="space-y-2">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-[11px] font-medium text-foreground">{skill.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Tools & Methodology */}
            <div className="glass-card p-3">
              <div className="flex items-center gap-1.5 mb-2 justify-center">
                <Wrench className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px] font-semibold text-foreground font-mono">Ferramentas & Metodologias</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {tools.map((t) => (
                  <span key={t} className="skill-badge text-[10px] px-2.5 py-1 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShortsLayout>
  );
};

export default SkillsSection;
