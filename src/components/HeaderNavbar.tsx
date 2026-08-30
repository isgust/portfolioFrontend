import { useState, useRef, useEffect } from "react";
import { Search, Mic, Bell, Play, Code, User, Wrench, Briefcase, FolderGit2, Mail, MicOff } from "lucide-react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import NotificationsDropdown from "./NotificationsDropdown";

interface SearchItem {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  {
    id: "1",
    sectionId: "hero",
    title: "Desenvolvedor BackEnd Java Jr",
    description: "Perfil Principal — Java, Spring Boot, MySQL, UFMA",
    category: "Perfil",
    keywords: ["java", "spring", "backend", "ufma", "autobahn", "sql", "rest", "gustavo"],
  },
  {
    id: "2",
    sectionId: "about",
    title: "Sobre Gustavo Rocha",
    description: "Engenharia da Computação na UFMA, histórico profissional e certificações",
    category: "Sobre Mim",
    keywords: ["sobre", "formacao", "graduacao", "ufma", "senac", "certificacoes", "engenharia"],
  },
  {
    id: "3",
    sectionId: "skills",
    title: "Habilidades Técnicas & Tecnologias",
    description: "Java, Spring Boot, MySQL, React, Docker",
    category: "Habilidades",
    keywords: ["skills", "java", "spring", "mysql", "react", "typescript", "docker", "git", "scrum"],
  },
  {
    id: "4",
    sectionId: "experience",
    title: "Trajetória Profissional & Experiências",
    description: "AutoBahn Tecnologia, BRISA e Softcom",
    category: "Experiência",
    keywords: ["experiencia", "trajetoria", "autobahn", "brisa", "softcom", "helpdesk", "empresa", "carreira"],
  },
  {
    id: "5",
    sectionId: "projects",
    title: "Projetos em Destaque & Repositórios",
    description: "Sistemas DESIF, SMART, SAC, Desafio Itaú e Portfólio Full-Stack",
    category: "Projetos",
    keywords: ["projetos", "portfolio", "desif", "smart", "sac", "itau", "github", "codigo"],
  },
  {
    id: "6",
    sectionId: "contact",
    title: "Contato, E-mail & Redes Sociais",
    description: "LinkedIn, GitHub e formulário de contato direto",
    category: "Contato",
    keywords: ["contato", "email", "linkedin", "github", "redes", "mensagem"],
  },
];

const HeaderNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { unreadCount } = useNotifications();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K / Cmd+K global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        toast.info("Atalho acionado: Pesquisa rápida ativada (Ctrl+K)");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search logic
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const matches = SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );

    setSearchResults(matches);
    setShowSearchDropdown(true);
  }, [searchQuery]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectResult = (sectionId: string, title: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      toast.success(`Navegando para: ${title}`);
    }
    setShowSearchDropdown(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].sectionId, searchResults[0].title);
    } else {
      toast.error(`Nenhum resultado encontrado para "${searchQuery}"`);
    }
  };

  // Functional Speech Recognition (Web Speech API)
  const handleVoiceSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Reconhecimento de voz não é suportado neste navegador.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "pt-BR";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Ouvindo... Fale sua busca no microfone!");
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setSearchQuery(text);
        setIsListening(false);
        toast.success(`Voz reconhecida: "${text}"`);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (err: any) => {
        console.error(err);
        setIsListening(false);
        toast.error("Não foi possível capturar o áudio. Tente novamente.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      toast.error("Erro ao iniciar pesquisa por voz.");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Perfil":
        return <User className="w-3.5 h-3.5 text-primary" />;
      case "Habilidades":
        return <Wrench className="w-3.5 h-3.5 text-amber-400" />;
      case "Experiência":
        return <Briefcase className="w-3.5 h-3.5 text-sky-400" />;
      case "Projetos":
        return <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "Contato":
        return <Mail className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Code className="w-3.5 h-3.5 text-primary" />;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-md border-b border-border/40 px-3 md:px-6 flex items-center justify-between gap-2 shadow-sm">
        {/* Left: YouTube Brand + User Name */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#hero" className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary rounded-lg outline-none">
            <div className="w-8 h-6 bg-primary rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            <span className="font-bold text-sm md:text-base font-display text-foreground tracking-tight">
              Gustavo Rocha
            </span>
          </a>
        </div>

        {/* Center: Functional Search Bar (100% Pixel-Perfect Aligned with shorts-card column) */}
        <div ref={searchContainerRef} className="header-search-aligned relative flex-1 max-w-[400px] w-full mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center bg-card border border-border/50 rounded-full overflow-hidden focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 transition-all shadow-inner pr-1"
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
              placeholder="Pesquisar no portfólio..."
              className="w-full bg-transparent px-4 py-1.5 text-xs md:text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
            />

            {/* Keyboard Shortcut Badge (Ctrl+K) */}
            {!searchQuery && (
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground bg-secondary/80 border border-border/40 rounded-md shrink-0 mr-1 shadow-sm">
                <span>Ctrl</span> <span>K</span>
              </kbd>
            )}

            {/* Functional Voice Search Button Inside Input Capsule */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              aria-label="Pesquisa por voz"
              title="Pesquisar por voz"
              className={`p-1.5 rounded-full transition-all shrink-0 mr-1 focus-visible:ring-2 focus-visible:ring-primary outline-none ${isListening
                  ? "bg-primary text-white animate-pulse"
                  : "text-muted-foreground hover:text-primary"
                }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Search Magnifier Submit Button */}
            <button
              type="submit"
              aria-label="Buscar"
              className="px-4 py-2 bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border-l border-border/40 transition-colors flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-150">
              <div className="p-2 border-b border-border/30 text-[11px] font-medium text-muted-foreground flex justify-between px-3">
                <span>Resultados no Portfólio</span>
                <span>{searchResults.length} encontrado(s)</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-border/20 text-left">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Nenhum resultado encontrado para &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectResult(item.sectionId, item.title)}
                      className="w-full p-2.5 flex items-start gap-3 hover:bg-secondary/70 transition-colors text-left group focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-primary outline-none"
                    >
                      <div className="p-1.5 rounded-lg bg-secondary shrink-0 mt-0.5 group-hover:bg-primary/20">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: YouTube Action Icons */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notificações"
            title="Notificações de curtidas e comentários"
            className="relative w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </button>

          {/* Profile Avatar */}
          <a
            href="#contact"
            className="flex items-center gap-2 pl-1 group focus-visible:ring-2 focus-visible:ring-primary rounded-full outline-none"
            title="Ver Contato & Perfil"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-accent to-orange-400 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-xs font-bold text-foreground">
                GR
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
          </a>
        </div>
      </header>

      {/* Notifications Dropdown Modal */}
      <NotificationsDropdown
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};

export default HeaderNavbar;
