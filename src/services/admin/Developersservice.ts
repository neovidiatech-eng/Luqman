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

// ─── Property (as returned by the profile endpoint) ───────────────────────────

export interface DeveloperProperty {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  approvalStatus: string;
  rejectionReason: string | null;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number | null;
  city: string;
  district: string;
  address: string;
  lat: number | null;
  lng: number | null;
  images: string[];
  videoUrl: string | null;
  videoLinks: string[];
  files: { url: string; name: string; size: number; type: string }[];
  features: string[];
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  projectId: string | null;
}

// ─── Project (as returned by the profile endpoint) ────────────────────────────

export interface DeveloperProject {
  id: string;
  name: string;
  logoUrl: string | null;
  description: string;
  city: string;
  address: string;
  lat: number | null;
  lng: number | null;
  images: string[];
  videoUrl: string | null;
  videoLinks: string[];
  files: string[];
  status: string;
  approvalStatus: string;
  rejectionReason: string | null;
  completionPercent: number;
  unitTypes: string[];
  paymentPlans: string[];
  features: string[];
  totalUnits: number;
  deliveryDate: string;
  startingPrice: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  developerId: string;
}

// ─── Developer profile (sidebar data) ────────────────────────────────────────

export interface DeveloperProfileData {
  id: string;
  companyName: string;
  logoUrl: string | null;
  phone: string;
  createdAt: string;
  _count: {
    properties: number;
    projects: number;
  };
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

// ─── Service calls ────────────────────────────────────────────────────────────

export const getDevelopers = async (
  params: GetDevelopersParams = {},
): Promise<GetDevelopersResponse> => {
  const { page = 1, limit = 10, search, status } = params;
  const queryParams: Record<string, unknown> = { page, limit };
  if (search && search.trim() !== "") queryParams.search = search;
  if (status && status !== "all" && status !== "") queryParams.status = status;
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
