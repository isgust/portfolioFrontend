import { useState, useEffect, useCallback } from "react";
import API_URL from "@/config/api";

export interface Comentario {
  id: number;
  autor: string;
  texto: string;
  criadoEm: string;
}

export interface SectionInteractions {
  likes: number;
  comentarios: Comentario[];
  liked: boolean;
  loading: boolean;
  toggleLike: () => Promise<void>;
  addComentario: (autor: string, texto: string) => Promise<void>;
  refreshComentarios: () => Promise<void>;
}

export function useSectionInteractions(secaoId: string): SectionInteractions {
  const [likes, setLikes] = useState(0);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Persiste estado de like no localStorage para evitar duplo like na sessão
  const likedKey = `liked_${secaoId}`;

  const fetchLikes = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/secoes/${secaoId}/likes`);
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
      }
    } catch {
      // Backend pode estar acordando (Render free tier) — ignora silenciosamente
    }
  }, [secaoId]);

  const refreshComentarios = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/secoes/${secaoId}/comentarios`);
      if (res.ok) {
        const data = await res.json();
        setComentarios(data);
      }
    } catch {
      // Silencioso
    }
  }, [secaoId]);

  useEffect(() => {
    const wasLiked = localStorage.getItem(likedKey) === "true";
    setLiked(wasLiked);

    Promise.all([fetchLikes(), refreshComentarios()]).finally(() =>
      setLoading(false)
    );
  }, [secaoId, fetchLikes, refreshComentarios, likedKey]);

  const toggleLike = useCallback(async () => {
    const newLiked = !liked;
    const endpoint = newLiked ? "like" : "unlike";

    // Optimistic update
    setLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));
    localStorage.setItem(likedKey, String(newLiked));

    try {
      await fetch(`${API_URL}/api/secoes/${secaoId}/${endpoint}`, {
        method: "POST",
      });
    } catch {
      // Reverte em caso de erro
      setLiked(!newLiked);
      setLikes((prev) => (newLiked ? prev - 1 : prev + 1));
      localStorage.setItem(likedKey, String(!newLiked));
    }
  }, [liked, secaoId, likedKey]);

  const addComentario = useCallback(
    async (autor: string, texto: string) => {
      const res = await fetch(`${API_URL}/api/secoes/${secaoId}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autor: autor || "Anônimo", texto }),
      });
      if (res.ok) {
        await refreshComentarios();
      }
    },
    [secaoId, refreshComentarios]
  );

  return { likes, comentarios, liked, loading, toggleLike, addComentario, refreshComentarios };
}
