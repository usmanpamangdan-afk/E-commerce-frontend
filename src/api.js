  import axios from "axios";

  const API_URL =
    import.meta.env.VITE_API_URL || "https://0fxbpgxl-8000.inc1.devtunnels.ms";

  const api = axios.create({ baseURL: API_URL });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  export default api;