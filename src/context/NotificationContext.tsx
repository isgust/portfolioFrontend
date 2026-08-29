import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface NotificationItem {
  id: string;
  type: "like" | "dislike" | "comment" | "report";
  title: string;
  description: string;
  sectionId: string;
  sectionLabel: string;
  timestamp: string;
  autor?: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (item: Omit<NotificationItem, "id" | "timestamp" | "read">) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    title: "Nova curtida recebida!",
    description: "Alguém curtiu a seção 'Projetos & Códigos'",
    sectionId: "projects",
    sectionLabel: "Projetos & Códigos",
    timestamp: "há 2 min",
    autor: "Visitante",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    title: "Novo comentário no portfólio",
    description: "'Excelente estrutura de REST API com Spring Boot!'",
    sectionId: "about",
    sectionLabel: "Sobre Mim",
    timestamp: "há 10 min",
    autor: "Recrutador Tech",
    read: false,
  },
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem("portfolio_notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem("portfolio_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (item: Omit<NotificationItem, "id" | "timestamp" | "read">) => {
    const newNotif: NotificationItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: "agora mesmo",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};
