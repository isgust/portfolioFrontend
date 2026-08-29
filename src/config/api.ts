// Configuração da URL base da API
// Em dev: http://localhost:8080
// Em produção: URL do Render (definida via variável de ambiente VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default API_URL;
