import { ReactNode, useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreHorizontal, Flag, AlertTriangle, ShieldAlert } from "lucide-react";
import { useSectionInteractions } from "@/hooks/useSectionInteractions";
import { useNotifications } from "@/context/NotificationContext";
import { toast } from "sonner";
import CommentPanel from "./CommentPanel";

interface ShortsLayoutProps {
  children: ReactNode;
  sectionLabel: string;
  sectionNumber: number;
  totalSections: number;
  sectionId: string;
}

const ShortsLayout = ({
  children,
  sectionLabel,
  sectionNumber,
  totalSections,
  sectionId,
}: ShortsLayoutProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [showDenounceModal, setShowDenounceModal] = useState(false);

  const { likes, comentarios, liked, toggleLike, addComentario } =
    useSectionInteractions(sectionId);

  const { addNotification } = useNotifications();

  const handleLike = async () => {
    if (likeAnimating) return;
    if (disliked) setDisliked(false);
    setLikeAnimating(true);
    await toggleLike();

    if (!liked) {
      addNotification({
        type: "like",
        title: `Nova curtida em ${sectionLabel}`,
        description: `Alguém curtiu o card "${sectionLabel}"`,
        sectionId,
        sectionLabel,
      });
    }

    setTimeout(() => setLikeAnimating(false), 600);
  };

  const handleDislike = () => {
    const nextDisliked = !disliked;
    setDisliked(nextDisliked);
    if (liked) toggleLike();

    if (nextDisliked) {
      addNotification({
        type: "dislike",
        title: `Avaliação em ${sectionLabel}`,
        description: `Um visitante marcou não gostei em "${sectionLabel}"`,
        sectionId,
        sectionLabel,
      });
    }
  };

  const handleAddComment = async (autor: string, texto: string) => {
    await addComentario(autor, texto);
    addNotification({
      type: "comment",
      title: `Novo comentário em ${sectionLabel}`,
      description: `@${autor || "Anônimo"}: "${texto}"`,
      sectionId,
      sectionLabel,
      autor: autor || "Anônimo",
    });
  };

  const toggleComments = () => {
    setCommentOpen((prev) => !prev);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleConfirmDenounce = () => {
    setShowDenounceModal(false);
    toast.error("🚨 Denúncia enviada! Espera... você denunciou o Gustavo no próprio portfólio dele?! 😱", {
      duration: 5000,
    });

    addNotification({
      type: "report",
      title: "🚨 Denúncia Registrada!",
      description: `Alguém tentou denunciar a seção "${sectionLabel}". Ei! O portfólio é meu, você não pode fazer isso! 😂`,
      sectionId,
      sectionLabel,
    });
  };

  return (
    <section className="section-slide relative">
      <div className="flex items-center justify-center h-full w-full gap-4 transition-all duration-300">
        {/* Main content card - vertical format like Shorts */}
        <div className="shorts-card relative shrink-0">
          {/* Content */}
          <div className="h-full w-full flex flex-col overflow-hidden">
            {children}
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                {sectionNumber}
              </div>
              <div className="min-w-0 text-left">
                <p className="font-medium text-sm truncate">{sectionLabel}</p>
                <p className="text-xs text-muted-foreground">
                  {sectionNumber} de {totalSections}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Shorts Action Buttons (Right side on Desktop) */}
        <div className="hidden md:flex flex-col items-center gap-4 shrink-0 relative">
          {/* Like */}
          <button
            onClick={handleLike}
            className="shorts-action-btn group"
            aria-label={liked ? "Remover gostei" : "Gostei"}
          >
            <div
              className={`shorts-action-icon relative overflow-visible ${
                liked ? "bg-primary/20 border-primary/50 text-primary" : ""
              }`}
            >
              <ThumbsUp
                className={`w-6 h-6 transition-all duration-300 ${
                  liked
                    ? "text-primary fill-primary"
                    : "group-hover:text-primary"
                } ${likeAnimating ? "animate-like-pop" : ""}`}
              />
              {likeAnimating && liked && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="like-particle"
                      style={{
                        "--angle": `${i * 60}deg`,
                        "--delay": `${i * 40}ms`,
                      } as React.CSSProperties}
                    />
                  ))}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {likes > 0 ? likes : "Gostei"}
            </span>
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="shorts-action-btn group"
            aria-label="Não gostei"
          >
            <div
              className={`shorts-action-icon ${
                disliked ? "bg-secondary text-foreground" : ""
              }`}
            >
              <ThumbsDown
                className={`w-6 h-6 transition-colors ${
                  disliked ? "fill-current text-foreground" : "group-hover:text-primary"
                }`}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Não gostei
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={toggleComments}
            className="shorts-action-btn group"
            aria-label="Ver comentários"
          >
            <div
              className={`shorts-action-icon transition-all ${
                commentOpen ? "bg-primary/20 border-primary/50 text-primary" : ""
              }`}
            >
              <MessageCircle
                className={`w-6 h-6 transition-colors ${
                  commentOpen ? "text-primary fill-primary/20" : "group-hover:text-primary"
                }`}
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {comentarios.length > 0 ? comentarios.length : "Comentar"}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="shorts-action-btn group"
            aria-label="Compartilhar"
          >
            <div className="shorts-action-icon">
              <Share2 className="w-6 h-6 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Compartilhar
            </span>
          </button>

          {/* More options (...) */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen((prev) => !prev)}
              className="shorts-action-btn group"
              aria-label="Mais opções"
            >
              <div className="shorts-action-icon">
                <MoreHorizontal className="w-6 h-6 group-hover:text-primary transition-colors" />
              </div>
            </button>

            {/* Popup Menu */}
            {moreMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreMenuOpen(false)} />
                <div className="absolute right-14 bottom-0 z-50 w-48 bg-card border border-border/60 rounded-2xl shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150 text-left">
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      setShowDenounceModal(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"
                  >
                    <Flag className="w-4 h-4 text-destructive shrink-0" />
                    Denunciar este card
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Side Panel (Desktop) or Bottom Sheet (Mobile) */}
        <CommentPanel
          isOpen={commentOpen}
          onClose={() => setCommentOpen(false)}
          comentarios={comentarios}
          onSubmit={handleAddComment}
          sectionLabel={sectionLabel}
        />

        {/* Mobile Action Buttons (Floating at Bottom Right) */}
        <div className="md:hidden fixed bottom-6 right-4 flex flex-col items-center gap-3 z-30">
          <button
            onClick={handleLike}
            className="w-12 h-12 rounded-full bg-card border border-border/50 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <ThumbsUp
              className={`w-5 h-5 transition-all ${
                liked ? "text-primary fill-primary" : "text-muted-foreground"
              } ${likeAnimating ? "animate-like-pop" : ""}`}
            />
            {likes > 0 && (
              <span className="text-[9px] text-muted-foreground">{likes}</span>
            )}
          </button>
          <button
            onClick={toggleComments}
            className={`w-12 h-12 rounded-full border border-border/50 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform ${
              commentOpen ? "bg-primary/20 border-primary/50 text-primary" : "bg-card"
            }`}
          >
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            {comentarios.length > 0 && (
              <span className="text-[9px] text-muted-foreground">
                {comentarios.length}
              </span>
            )}
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setShowDenounceModal(true)}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg active:scale-95 transition-transform text-destructive"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Denounce Modal (Funny Interrogation Dialog) */}
      {showDenounceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border/60 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-foreground">
                Página em Investigação! 🤔
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pai, você vai me denunciar mesmo? <br />
                <strong className="text-foreground">O portfólio é meu, você não pode fazer isso! 😂</strong>
              </p>
            </div>

            <div className="p-3 bg-secondary/50 rounded-2xl border border-border/40 text-xs text-left text-muted-foreground flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Ao confirmar esta denúncia, um alerta bem-humorado será enviado diretamente para a central de notificações do site.
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowDenounceModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors"
              >
                Deixa pra lá (Perdoar)
              </button>
              <button
                onClick={handleConfirmDenounce}
                className="flex-1 py-2.5 px-4 rounded-xl bg-destructive hover:bg-destructive/90 text-white font-semibold text-xs transition-colors shadow-md"
              >
                Denunciar assim mesmo!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShortsLayout;
