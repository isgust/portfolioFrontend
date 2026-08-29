// Configuração da URL base da API
const isProd = import.meta.env.PROD;
const API_URL = import.meta.env.VITE_API_URL || (isProd ? "https://gustavorocha.onrender.com" : "http://localhost:8080");

export default API_URL;
