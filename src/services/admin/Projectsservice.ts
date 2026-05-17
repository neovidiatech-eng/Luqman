import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  logoUrl: string | null;
  description: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  videoUrl: string | null;
  files: string[];
  status: "under_construction" | "development" | "completed";
  approvalStatus: "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  completionPercent: number;
  totalUnits: number;
  deliveryDate: string;
  startingPrice: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  developer: {
    companyName: string;
  };
}

export interface ProjectsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: Project[];
    pagination: ProjectsPagination;
  };
}

interface ProjectActionResponse {
  success: boolean;
  message: string;
  data: object;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getProjects = async (
  params: GetProjectsParams = {},
): Promise<GetProjectsResponse> => {
  const { page = 1, limit = 10, search, status } = params;
  const response = await api.get<GetProjectsResponse>(
    "/api/v1/admin/projects",
    {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(status && { status }),
      },
    },
  );
  return response.data;
};

/** PATCH /api/v1/admin/projects/:id/feature */
export const featureProject = async (
  id: string,
): Promise<ProjectActionResponse> => {
  const response = await api.patch<ProjectActionResponse>(
    `/api/v1/admin/projects/${id}/feature`,
  );
  return response.data;
};

/** DELETE /api/v1/admin/projects/:id */
export const deleteProject = async (
  id: string,
): Promise<ProjectActionResponse> => {
  const response = await api.delete<ProjectActionResponse>(
    `/api/v1/admin/projects/${id}`,
  );
  return response.data;
};
