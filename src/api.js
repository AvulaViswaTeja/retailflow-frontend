import axios from 'axios';

// ← paste your token here between the quotes
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkByZXRhaWxmbG93LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3OTYyNzQ1MSwiZXhwIjoxNzc5NzEzODUxfQ.5A58SumA0oFHluWS-BZMCxnHT3GDp05gukv3K3Bh2JM';

const api = axios.create({
  baseURL: 'http://localhost:8014',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

export default api;