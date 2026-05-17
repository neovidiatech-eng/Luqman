import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { baseURL } from "../consts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

interface AdminData {
  id: string;
  name: string;
  email: string;
}

interface DeveloperData {
  id: string;
  companyName: string;
  email: string;
}

interface LoginResponseData {
  token: string;
  admin?: AdminData;
  developer?: DeveloperData;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

// ─── Token Helpers ────────────────────────────────────────────────────────────

const TOKEN_KEY = "token";

const getToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);

const saveToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);

const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 300000,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ─── Auth Functions ───────────────────────────────────────────────────────────

export const login = async (
  data: Record<string, string>,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const token = response.data?.data?.token;

  if (token) {
    saveToken(token);
  }

  return response.data;
};

export const logout = (): void => {
  clearToken();
  window.location.href = "/login";
};

export default api;
