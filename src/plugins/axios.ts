import axios from 'axios';

const useApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
  headers: { 'Content-Type': 'application/json' }
});

export default useApi;
