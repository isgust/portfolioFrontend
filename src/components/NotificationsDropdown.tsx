import { ThumbsUp, ThumbsDown, MessageCircle, CheckCheck, Trash2, X, Bell, AlertTriangle } from "lucide-react";
import { useNotifications, NotificationItem } from "@/context/NotificationContext";

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown = ({ isOpen, onClose }: NotificationsDropdownProps) => {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();

  if (!isOpen) return null;

  const handleNotificationClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "like":
        return (
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <ThumbsUp className="w-4 h-4 fill-primary" />
          </div>
        );
      case "dislike":
        return (
          <div className="w-8 h-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
            <ThumbsDown className="w-4 h-4" />
          </div>
        );
      case "comment":
        return (
          <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 fill-accent/30" />
          </div>
        );
      case "report":
        return (
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Notifications Dropdown Container */}
      <div className="fixed top-14 right-3 md:right-6 z-50 w-[92vw] max-w-sm bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-card">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm font-display text-foreground">Notificações</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full">
                {unreadCount} novas
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  title="Marcar todas como lidas"
                  aria-label="Marcar todas como lidas"
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button
                  onClick={clearNotifications}
                  title="Limpar histórico"
                  aria-label="Limpar histórico"
                  className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-secondary transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-border/20 text-left">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">Nenhuma notificação ainda</p>
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                Interações de curtidas e comentários aparecerão aqui.
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n.sectionId)}
                className={`p-3 flex items-start gap-3 hover:bg-secondary/60 cursor-pointer transition-colors ${
                  !n.read ? "bg-primary/5" : ""
                }`}
              >
                {getIcon(n.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-foreground truncate">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {n.description}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {n.sectionLabel}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
