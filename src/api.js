import axios from 'axios';

// ← paste your token here between the quotes
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkByZXRhaWxmbG93LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3OTUzNzU3NiwiZXhwIjoxNzc5NjIzOTc2fQ.po-zRcc_2Jlt5C8tnlPtDYnBVQDSf6IV9a4HxThxR7Q';

const api = axios.create({
  baseURL: 'http://localhost:8014',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

export default api;