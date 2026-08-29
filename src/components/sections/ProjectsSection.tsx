import { useState, useEffect } from "react";
import { ExternalLink, Github, Code, Sparkles, Database, Lock, ShieldCheck, Info, Cpu, Landmark, FileText, Headphones, Eye } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";
import API_URL from "@/config/api";
import { toast } from "sonner";

interface ProjetoBackend {
  id?: number;
  titulo: string;
  descricaoBreve: string;
  descricaoDetalhada?: string;
  tecnologias: string;
  githubUrl?: string;
  demoUrl?: string;
  imagemUrlCapa?: string;
  destaque: boolean;
  privado?: boolean;
  empresa?: string;
}

const fallbackProjects: ProjetoBackend[] = [
  {
    id: 1,
    titulo: "Sistema DESIF (Declaração Fiscal Financeira)",
    descricaoBreve: "Sistema corporativo para apuração e declaração fiscal de serviços bancários e instituições financeiras (DESIF).",
    descricaoDetalhada: "Desenvolvimento de APIs backend em Java & Spring Boot integradas ao frontend Angular. Foco em processamento de guias tributárias, validações fiscais de alta precisão e modelagem MySQL.",
    tecnologias: "Java, Spring Boot, MySQL, Angular, REST APIs",
    githubUrl: "",
    demoUrl: "",
    destaque: true,
    privado: true,
    empresa: "AutoBahn Tecnologia",
  },
  {
    id: 2,
    titulo: "Sistema SMART (Gestão Tributária & ITBI)",
    descricaoBreve: "Plataforma inteligente de gestão tributária municipal com módulo de cálculo e análise de ITBI em tempo real.",
    descricaoDetalhada: "Arquitetura de microsserviços para análise de guias de ITBI (Imposto sobre Transmissão de Bens Imóveis). Automação de cálculos, relatórios de transmissão e persistência em banco MySQL.",
    tecnologias: "Java, Spring Boot, MySQL, Angular, TypeScript",
    githubUrl: "",
    demoUrl: "",
    destaque: false,
    privado: true,
    empresa: "AutoBahn Tecnologia",
  },
  {
    id: 3,
    titulo: "Sistema SAC (Atendimento & Chamados)",
    descricaoBreve: "Sistema web de atendimento ao cliente, controle de ordens de serviço e gestão de chamados operacionais.",
    descricaoDetalhada: "APIs RESTful para gerenciamento de filas de atendimento, notificações e histórico de solicitações técnicas da plataforma corporativa.",
    tecnologias: "Java, Spring Boot, REST APIs, MySQL, TypeScript",
    githubUrl: "",
    demoUrl: "",
    destaque: false,
    privado: true,
    empresa: "AutoBahn Tecnologia",
  },
  {
    id: 4,
    titulo: "Desafio Técnico Backend Jr (Itaú)",
    descricaoBreve: "API RESTful desenvolvida para o desafio técnico de contratação Backend Jr do Itaú Unibanco.",
    descricaoDetalhada: "Resolução oficial do desafio técnico do Itaú. A API recebe transações financeiras em tempo real, efetua validação de payload com Bean Validation e calcula estatísticas dos últimos 60 segundos.",
    tecnologias: "Java, Spring Boot, REST API, Bean Validation, JUnit",
    githubUrl: "https://github.com/isgust/desafio-itau",
    demoUrl: "",
    destaque: false,
    privado: false,
  },
  {
    id: 5,
    titulo: "Portfólio Full-Stack & REST API",
    descricaoBreve: "Aplicação web estilo Shorts integrada ao Spring Boot, banco MySQL/H2, curtidas e comentários persistentes.",
    descricaoDetalhada: "Sistema web com arquitetura desacoplada. Backend em Spring Boot com Spring Data JPA, endpoints RESTful e validação Bean Validation. Frontend em React 18, TypeScript, Tailwind CSS e Web Speech API.",
    tecnologias: "Java, Spring Boot, React, REST API, JPA",
    githubUrl: "https://github.com/isgust/meuPortfolio",
    demoUrl: "https://psychological-jerrylee-isgust-ef14171b.koyeb.app/",
    destaque: false,
    privado: false,
  },
];

const ProjectsSection = () => {
  const [projetos, setProjetos] = useState<ProjetoBackend[]>(fallbackProjects);
  const [isFromDb, setIsFromDb] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjetoBackend | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/projetos`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar projetos");
        return res.json();
      })
      .then((data: ProjetoBackend[]) => {
        if (data && data.length > 0) {
          setProjetos(data);
          setIsFromDb(true);
        }
      })
      .catch((err) => {
        console.log("Usando projetos locais de fallback:", err);
      });
  }, []);

  const handlePrivateClick = (empresa?: string) => {
    toast.info(`🔒 Código Privado: Projeto corporativo desenvolvido na ${empresa || "AutoBahn Tecnologia"}. Protegido por NDA.`, {
      duration: 4000,
    });
  };

  const getProjectIcon = (titulo: string) => {
    if (titulo.includes("DESIF")) return <Landmark className="w-4 h-4 text-emerald-400" />;
    if (titulo.includes("SMART")) return <FileText className="w-4 h-4 text-sky-400" />;
    if (titulo.includes("SAC")) return <Headphones className="w-4 h-4 text-purple-400" />;
    if (titulo.includes("Itaú")) return <Cpu className="w-4 h-4 text-amber-400" />;
    return <Code className="w-4 h-4 text-primary" />;
  };

  return (
    <ShortsLayout sectionLabel="Projetos & Códigos" sectionNumber={5} totalSections={6} sectionId="projetos">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        <TechVideoBackground type="projetos" />
        
        <div className="relative z-10 w-full flex flex-col items-center my-auto px-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest font-mono">Portfólio de Código</span>
            {isFromDb && (
              <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.2 rounded-full">
                <Database className="w-2.5 h-2.5" /> API REST (DB)
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-display mt-0.5 mb-4">
            Projetos <span className="gradient-text">Em Destaque</span>
          </h2>
          
          <div className="space-y-3 w-full text-left max-h-[440px] overflow-y-auto pr-2 pt-1">
            {projetos.map((project, index) => {
              const tagsArray = project.tecnologias
                ? project.tecnologias.split(",").map((t) => t.trim())
                : [];

              const isPrivate = project.privado || (!project.githubUrl && !project.demoUrl);

              return (
                <div 
                  key={project.id || index}
                  className={`glass-card p-3 relative hover:border-primary/50 transition-all duration-300 ${
                    project.destaque ? "pt-5 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card" : ""
                  }`}
                >
                  {project.destaque && (
                    <span className="absolute top-1.5 right-2.5 px-2 py-0.5 bg-gradient-to-r from-primary to-accent text-white rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md z-10">
                      <Sparkles className="w-2.5 h-2.5" /> Destaque
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-lg bg-primary/20 shrink-0">
                        {getProjectIcon(project.titulo)}
                      </div>
                      <h3 className="text-xs font-bold font-display text-foreground group-hover:text-primary transition-colors truncate">
                        {project.titulo}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isPrivate ? (
                        <button
                          onClick={() => handlePrivateClick(project.empresa)}
                          className="px-2 py-0.5 rounded-md bg-secondary/80 border border-border/50 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 flex items-center gap-1 transition-all"
                          title="Código proprietário AutoBahn (Sob NDA)"
                        >
                          <Lock className="w-3 h-3 text-amber-400" /> Privado
                        </button>
                      ) : (
                        <>
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl}
                              className="p-1 rounded-md glass-card hover:bg-primary/20 hover:text-primary transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Ver Código no GitHub"
                              title="Ver repositório público no GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.demoUrl && project.demoUrl !== "#" && (
                            <a 
                              href={project.demoUrl}
                              className="p-1 rounded-md glass-card hover:bg-primary/20 hover:text-primary transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Ver Aplicação Online"
                              title="Ver aplicação em produção"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed line-clamp-2">
                    {project.descricaoBreve}
                  </p>

                  {/* Actions & Architecture Details Button */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30">
                    <div className="flex flex-wrap gap-1 flex-1">
                      {tagsArray.slice(0, 4).map((tag) => (
                        <span 
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded-full bg-secondary/80 border border-border/40 text-foreground/90 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.descricaoDetalhada && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-[10px] font-semibold text-primary hover:underline flex items-center gap-1 shrink-0 ml-1"
                        title="Ver detalhes e arquitetura do projeto"
                      >
                        <Eye className="w-3.5 h-3.5" /> Detalhes
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Study & Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/60 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/20 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">
                    {selectedProject.titulo}
                  </h3>
                  {selectedProject.empresa && (
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Desenvolvido em: {selectedProject.empresa}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <div>
                <strong className="text-foreground font-semibold block mb-1">📌 Visão Geral & Escopo:</strong>
                <p>{selectedProject.descricaoBreve}</p>
              </div>

              {selectedProject.descricaoDetalhada && (
                <div>
                  <strong className="text-foreground font-semibold block mb-1">⚙️ Arquitetura & Engenharia Backend:</strong>
                  <p className="bg-secondary/40 p-3 rounded-xl border border-border/30 text-foreground/90 font-mono text-[11px]">
                    {selectedProject.descricaoDetalhada}
                  </p>
                </div>
              )}

              {selectedProject.githubUrl && (
                <div>
                  <strong className="text-foreground font-semibold block mb-1">🔗 Repositório Público no GitHub:</strong>
                  <a 
                    href={selectedProject.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-mono text-[11px] hover:underline break-all"
                  >
                    {selectedProject.githubUrl}
                  </a>
                </div>
              )}

              {selectedProject.privado && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-400 flex items-start gap-2">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Código Proprietário AutoBahn:</strong> O código-fonte deste projeto pertence à AutoBahn Tecnologia e está protegido por acordo de confidencialidade (NDA).
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-primary text-white rounded-xl font-semibold text-xs hover:bg-primary/90 transition-colors shadow-md"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </ShortsLayout>
  );
};

export default ProjectsSection;
