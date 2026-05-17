import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminLoginPayload {
  email: string;
  password: string;
}

interface AdminData {
  id: string;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: AdminData;
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const adminLogin = async (
  payload: AdminLoginPayload,
): Promise<AdminLoginResponse> => {
  const response = await api.post<AdminLoginResponse>(
    "/api/v1/auth/admin/login",
    payload,
  );

  const token = response.data?.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};
