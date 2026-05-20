// import api from "@/lib/axios";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface Developer {
//   id: string;
//   companyName: string;
//   email: string;
//   phone: string;
//   logoUrl: string | null;
//   commercialRegFile: string;
//   accountStatus: "active" | "suspended" | "pending";
//   createdAt: string;
//   updatedAt: string;
// }

// export interface DevelopersPagination {
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
//   hasNextPage: boolean;
//   hasPrevPage: boolean;
// }

// export interface GetDevelopersParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   status?: string;
// }

// export interface GetDevelopersResponse {
//   success: boolean;
//   message: string;
//   data: {
//     developers: Developer[];
//     pagination: DevelopersPagination;
//   };
// }

// export interface DeveloperProperty {
//   id: string;
//   title: string;
//   district: string;
//   city: string;
//   price: number;
//   type: string;
//   approvalStatus: string;
//   images: string[];
//   createdAt: string;
// }

// export interface DeveloperProfileData {
//   id: string;
//   companyName: string;
//   email: string;
//   phone: string;
//   logoUrl: string | null;
//   commercialRegFile: string;
//   accountStatus: "active" | "suspended" | "pending";
//   createdAt: string;
//   updatedAt: string;
//   properties: DeveloperProperty[];
// }

// export interface GetDeveloperProfileResponse {
//   success: boolean;
//   message: string;
//   data: {
//     developer: DeveloperProfileData;
//   };
// }

// // ─── Service ──────────────────────────────────────────────────────────────────

// export const getDevelopers = async (
//   params: GetDevelopersParams = {},
// ): Promise<GetDevelopersResponse> => {
//   const { page = 1, limit = 10, search, status } = params;

//   const queryParams: Record<string, unknown> = { page, limit };

//   if (search && search.trim() !== "") {
//     queryParams.search = search;
//   }

//   if (status && status !== "all" && status !== "") {
//     queryParams.status = status;
//   }
//   const response = await api.get<GetDevelopersResponse>(
//     "/api/v1/admin/developers",
//     { params: queryParams },
//   );

//   return response.data;
// };

// interface ToggleStatusResponse {
//   success: boolean;
//   message: string;
//   data: object;
// }

// export const activateDeveloper = async (
//   id: string,
// ): Promise<ToggleStatusResponse> => {
//   const response = await api.patch<ToggleStatusResponse>(
//     `/api/v1/admin/developers/${id}/activate`,
//   );
//   return response.data;
// };

// export const disableDeveloper = async (
//   id: string,
// ): Promise<ToggleStatusResponse> => {
//   const response = await api.patch<ToggleStatusResponse>(
//     `/api/v1/admin/developers/${id}/disable`,
//   );
//   return response.data;
// };

// export const deleteDeveloper = async (id: string): Promise<void> => {
//   await api.delete(`/api/v1/admin/developers/${id}`);
// };

// export const getDeveloperProfile = async (
//   id: string,
// ): Promise<GetDeveloperProfileResponse> => {
//   const response = await api.get<GetDeveloperProfileResponse>(
//     `/api/v1/developer/profile/${id}`,
//   );
//   return response.data;
// };

import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Developer {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  logoUrl: string | null;
  commercialRegFile: string;
  accountStatus: "active" | "suspended" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface DevelopersPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetDevelopersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetDevelopersResponse {
  success: boolean;
  message: string;
  data: {
    developers: Developer[];
    pagination: DevelopersPagination;
  };
}

export interface DeveloperProperty {
  id: string;
  title: string;
  district: string;
  city: string;
  price: number;
  type: string;
  approvalStatus: string;
  images: string[];
  createdAt: string;
}

export interface DeveloperProject {
  id: string;
  name: string;
  logoUrl: string | null;
  city: string;
  status: string;
  approvalStatus: string;
  startingPrice: number;
  totalUnits: number;
  completionPercent: number;
  createdAt: string;
}

export interface DeveloperProfileData {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  logoUrl: string | null;
  commercialRegFile: string;
  accountStatus: "active" | "suspended" | "pending";
  createdAt: string;
  updatedAt: string;
  _count: {
    properties: number;
    projects: number;
  };
  properties: DeveloperProperty[];
  projects: DeveloperProject[];
}

export interface GetDeveloperProfileResponse {
  success: boolean;
  message: string;
  data: {
    developer: DeveloperProfileData;
    properties: DeveloperProperty[];
    projects: DeveloperProject[];
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getDevelopers = async (
  params: GetDevelopersParams = {},
): Promise<GetDevelopersResponse> => {
  const { page = 1, limit = 10, search, status } = params;

  const queryParams: Record<string, unknown> = { page, limit };

  if (search && search.trim() !== "") {
    queryParams.search = search;
  }

  if (status && status !== "all" && status !== "") {
    queryParams.status = status;
  }

  const response = await api.get<GetDevelopersResponse>(
    "/api/v1/admin/developers",
    { params: queryParams },
  );

  return response.data;
};

interface ToggleStatusResponse {
  success: boolean;
  message: string;
  data: object;
}

export const activateDeveloper = async (
  id: string,
): Promise<ToggleStatusResponse> => {
  const response = await api.patch<ToggleStatusResponse>(
    `/api/v1/admin/developers/${id}/activate`,
  );
  return response.data;
};

export const disableDeveloper = async (
  id: string,
): Promise<ToggleStatusResponse> => {
  const response = await api.patch<ToggleStatusResponse>(
    `/api/v1/admin/developers/${id}/disable`,
  );
  return response.data;
};

export const deleteDeveloper = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/admin/developers/${id}`);
};

export const getDeveloperProfile = async (
  id: string,
): Promise<GetDeveloperProfileResponse> => {
  const response = await api.get<GetDeveloperProfileResponse>(
    `/api/v1/developer/profile/${id}`,
  );
  return response.data;
};
