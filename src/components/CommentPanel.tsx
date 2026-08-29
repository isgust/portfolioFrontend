import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, ThumbsUp, Loader2 } from "lucide-react";
import { Comentario } from "@/hooks/useSectionInteractions";

interface CommentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  comentarios: Comentario[];
  onSubmit: (autor: string, texto: string) => Promise<void>;
  sectionLabel: string;
}

const CommentPanel = ({
  isOpen,
  onClose,
  comentarios,
  onSubmit,
  sectionLabel,
}: CommentPanelProps) => {
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Escape key listener to close panel
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [isOpen, comentarios]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || sending) return;
    setSending(true);
    try {
      await onSubmit(autor, texto);
      setTexto("");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Comment Side Panel - WAI-ARIA Dialog Layout */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Comentários em ${sectionLabel}`}
        tabIndex={-1}
        className="
          /* Desktop layout: Full height of section container, expanding across remaining width */
          md:relative md:z-auto md:w-[420px] lg:w-[480px] xl:w-[540px] md:h-full md:max-h-[calc(100vh-4.5rem)] md:rounded-2xl md:self-stretch
          /* Mobile layout: Full height bottom drawer */
          fixed bottom-0 left-0 right-0 z-50 h-[85vh] md:h-auto rounded-t-3xl md:rounded-b-2xl
          bg-card border border-border/60 shadow-2xl flex flex-col shrink-0 overflow-hidden outline-none animate-in fade-in slide-in-from-bottom-5 md:slide-in-from-right-5 duration-300
        "
      >
        {/* Mobile handle bar */}
        <div className="md:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Panel Header — YouTube Shorts style */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0 bg-card">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base font-display tracking-tight text-foreground">
              Comentários
            </span>
            <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
              {comentarios.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
            aria-label="Fechar comentários (Escape)"
            title="Fechar (ou pressione Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader: Section Context */}
        <div className="px-4 py-1.5 bg-secondary/40 text-[11px] text-muted-foreground border-b border-border/20 truncate text-left font-medium">
          Em: <span className="text-foreground font-semibold">{sectionLabel}</span>
        </div>

        {/* Comments List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-left divide-y divide-border/20"
        >
          {comentarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-xs font-medium text-foreground mb-1">
                Nenhum comentário ainda
              </p>
              <p className="text-[11px] text-muted-foreground">
                Seja o primeiro a deixar um comentário nesta seção!
              </p>
            </div>
          ) : (
            comentarios.map((c) => (
              <div key={c.id} className="pt-3 first:pt-0 flex gap-3 text-left animate-fade-in group">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm mt-0.5">
                  {(c.autor || "A")[0].toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground truncate">
                      @{c.autor || "Anônimo"}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatDate(c.criadoEm)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed break-words">
                    {c.texto}
                  </p>

                  {/* Comment Action Bar */}
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-1 focus-visible:ring-primary rounded outline-none">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors focus-visible:ring-1 focus-visible:ring-primary rounded outline-none">
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Form at Bottom */}
        <div className="p-3 border-t border-border/40 bg-card shrink-0 space-y-2">
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Seu nome ou @usuario (opcional)"
            className="w-full bg-secondary/50 border border-border/40 rounded-xl px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
            maxLength={50}
          />
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Adicione um comentário..."
              className="flex-1 bg-secondary/50 border border-border/40 rounded-xl px-3 py-2 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
              maxLength={500}
              required
            />
            <button
              type="submit"
              disabled={!texto.trim() || sending}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-md focus-visible:ring-2 focus-visible:ring-primary outline-none"
              aria-label="Enviar comentário"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentPanel;
