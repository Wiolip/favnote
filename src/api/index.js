import axios from 'axios';

const api = axios.create({
    // Jeśli używasz Vite, to będzie import.meta.env.VITE_API_URL
    // Jeśli na razie tylko lokalnie, to zostawiamy localhost
    baseURL: 'http://localhost:9000/api',
});

export default api;