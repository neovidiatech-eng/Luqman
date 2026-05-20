// import api from "@/lib/axios";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface DeveloperProfile {
//   id: string;
//   companyName: string;
//   email: string;
//   phone: string;
//   logoUrl?: string;
//   description?: string;
//   accountStatus: string;
//   commercialRegFile?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProfileResponse {
//   success: boolean;
//   message: string;
//   data: {
//     developer: DeveloperProfile;
//   };
// }

// export interface UpdateProfilePayload {
//   companyName?: string;
//   email?: string;
//   phone?: string;
//   description?: string;
// }

// export interface UpdateProfileResponse {
//   success: boolean;
//   message: string;
// }

// export interface ChangePasswordPayload {
//   oldPassword: string;
//   newPassword: string;
// }

// export interface ChangePasswordResponse {
//   success: boolean;
//   message: string;
// }

// // ─── Service ──────────────────────────────────────────────────────────────────

// export const getDeveloperProfile = async (): Promise<ProfileResponse> => {
//   const { data } = await api.get<ProfileResponse>("/api/v1/auth/developer/me");
//   return data;
// };

// export const updateDeveloperProfile = async (
//   payload: UpdateProfilePayload,
// ): Promise<UpdateProfileResponse> => {
//   const { data } = await api.put<UpdateProfileResponse>(
//     "/api/v1/developer/profile",
//     payload,
//   );
//   return data;
// };

// export const changePassword = async (
//   payload: ChangePasswordPayload,
// ): Promise<ChangePasswordResponse> => {
//   const { data } = await api.put<ChangePasswordResponse>(
//     "/api/v1/auth/developer/change-password",
//     payload,
//   );
//   return data;
// };

import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DeveloperProfile {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  logoUrl?: string;
  description?: string;
  accountStatus: string;
  commercialRegFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    developer: DeveloperProfile;
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getDeveloperProfile = async (): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>("/api/v1/auth/developer/me");
  return data;
};

export const updateDeveloperProfile = async (
  payload: FormData,
): Promise<UpdateProfileResponse> => {
  const { data } = await api.put<UpdateProfileResponse>(
    "/api/v1/developer/profile",
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const { data } = await api.put<ChangePasswordResponse>(
    "/api/v1/auth/developer/change-password",
    payload,
  );
  return data;
};
