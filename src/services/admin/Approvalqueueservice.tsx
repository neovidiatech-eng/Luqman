import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropertyFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface PendingProperty {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  approvalStatus: "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  city: string;
  district: string;
  address: string;
  lat: number | null;
  lng: number | null;
  images: string[];
  videoUrl: string | null;
  files: PropertyFile[];
  features: string[];
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  projectId: string;
  developer: {
    companyName: string;
  };
}

export interface PendingProject {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  city: string;
  district: string;
  address: string;
  images: string[];
  approvalStatus: "pending" | "approved" | "rejected";
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  developer: {
    companyName: string;
  };
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface GetApprovalQueueResponse {
  success: boolean;
  message: string;
  data: {
    properties: PendingProperty[];
    projects: PendingProject[];
    totalPending: number;
  };
}

export interface GetPendingPropertiesResponse {
  success: boolean;
  message: string;
  data: {
    properties: PendingProperty[];
  };
}

export interface GetPendingProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: PendingProject[];
  };
}

interface ApproveRejectResponse {
  success: boolean;
  message: string;
  data: object;
}
interface ProjectActionResponse {
  success: boolean;
  message: string;
  data: object;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/** GET /api/v1/admin/approval-queue */
export const getApprovalQueue = async (): Promise<GetApprovalQueueResponse> => {
  const response = await api.get<GetApprovalQueueResponse>(
    "/api/v1/admin/approval-queue",
  );
  return response.data;
};

/** GET /api/v1/admin/approval-queue/properties */
export const getPendingProperties =
  async (): Promise<GetPendingPropertiesResponse> => {
    const response = await api.get<GetPendingPropertiesResponse>(
      "/api/v1/admin/approval-queue/properties",
    );
    return response.data;
  };

/** GET /api/v1/admin/approval-queue/projects */
export const getPendingProjects =
  async (): Promise<GetPendingProjectsResponse> => {
    const response = await api.get<GetPendingProjectsResponse>(
      "/api/v1/admin/approval-queue/projects",
    );
    return response.data;
  };

// ─── Mutations ────────────────────────────────────────────────────────────────

/** PATCH /api/v1/admin/properties/:id/approve */
export const approveProperty = async (
  id: string,
): Promise<ApproveRejectResponse> => {
  const response = await api.patch<ApproveRejectResponse>(
    `/api/v1/admin/properties/${id}/approve`,
  );
  return response.data;
};

// rejectProperty
// rejectProperty
export const rejectProperty = async (
  id: string,
  reason: string,
): Promise<ApproveRejectResponse> => {
  const response = await api.patch<ApproveRejectResponse>(
    `/api/v1/admin/properties/${id}/reject`,
    { reason }, // ✅ كان rejectionReason
  );
  return response.data;
};
/** PATCH /api/v1/admin/projects/:id/approve */
export const approveProject = async (
  id: string,
): Promise<ProjectActionResponse> => {
  const response = await api.patch<ProjectActionResponse>(
    `/api/v1/admin/projects/${id}/approve`,
  );
  return response.data;
};

/** PATCH /api/v1/admin/projects/:id/reject */
export const rejectProject = async (
  id: string,
  reason: string,
): Promise<ProjectActionResponse> => {
  const response = await api.patch<ProjectActionResponse>(
    `/api/v1/admin/projects/${id}/reject`,
    { reason },
  );
  return response.data;
};
