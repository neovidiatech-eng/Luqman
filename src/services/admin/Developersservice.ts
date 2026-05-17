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

// ─── Service ──────────────────────────────────────────────────────────────────

export const getDevelopers = async (
  params: GetDevelopersParams = {},
): Promise<GetDevelopersResponse> => {
  const { page = 1, limit = 10, search, status } = params;

  const response = await api.get<GetDevelopersResponse>(
    "/api/v1/admin/developers",
    {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(status && status !== "all" && { status }),
      },
    },
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
