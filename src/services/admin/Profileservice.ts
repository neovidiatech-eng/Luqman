import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  avatarUrl: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: { admin: AdminProfile };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: { admin: AdminProfile };
}

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  whatsapp: string;
  avatar?: File | null;
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/** GET /api/v1/auth/admin/me */
export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await api.get<GetProfileResponse>("/api/v1/auth/admin/me");
  return response.data;
};

/** PUT /api/v1/auth/admin/profile — form-data */
export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("phone", payload.phone);
  formData.append("whatsapp", payload.whatsapp);
  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const response = await api.put<UpdateProfileResponse>(
    "/api/v1/auth/admin/profile",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

/** PUT /api/v1/auth/admin/change-password */
export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const response = await api.put<ChangePasswordResponse>(
    "/api/v1/auth/admin/change-password",
    payload,
  );
  return response.data;
};
