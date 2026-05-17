// ─── Types ────────────────────────────────────────────────────────────────────

import api, { LoginResponse } from "@/lib/axios";

export interface AdminRegisterPayload {
  name: string;
  email: string;
  whatsapp: string;
  phone: string;
  password: string;
}

export interface DeveloperRegisterPayload {
  companyName: string;
  email: string;
  phone: string;
  password: string;
  commercialRecord: File | null;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export const adminRegister = async (
  data: AdminRegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/auth/admin/register",
    data,
  );
  return response.data;
};

// ─── Developer ────────────────────────────────────────────────────────────────

export const developerRegister = async (
  data: DeveloperRegisterPayload,
): Promise<RegisterResponse> => {
  const formData = new FormData();

  formData.append("companyName", data.companyName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("password", data.password);

  if (data.commercialRecord) {
    formData.append("commercialRecord", data.commercialRecord);
  }

  const response = await api.post<RegisterResponse>(
    "/auth/developer/register",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
};

// ─── Login (shared) ───────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const token = response.data?.data?.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
