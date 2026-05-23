import axios from 'axios';

// ← paste your token here between the quotes
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkByZXRhaWxmbG93LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc3OTUzMjU5MywiZXhwIjoxNzc5NjE4OTkzfQ.bw_1bFQT1AcT7Ujg7CetlsQIKAY6tCVMZx8Kn7AuX3w';

const api = axios.create({
  baseURL: 'http://localhost:8014',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
});

export default api;