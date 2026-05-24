import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface UnitType {
  id: string;
  name: string;
  area: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
}

export interface PaymentPlan {
  id: string;
  name: string;
  downPayment: number;
  installments: number;
  installmentAmount: number;
  duration: number;
}

export type ProjectStatus =
  | "under_development"
  | "under_construction"
  | "completed";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type PropertyStatus = "available" | "sold" | "reserved";
export type PropertyType =
  | "apartment"
  | "villa"
  | "duplex"
  | "land"
  | "commercial"
  | "office"
  | "warehouse"
  | "shop"
  | "compound"
  | "offplan"
  | "resort"
  | "building";

export interface ProjectProperty {
  id: string;
  title: string;
  description?: string;
  type: PropertyType;
  status: PropertyStatus;
  approvalStatus: ApprovalStatus;
  rejectionReason: string | null;
  price: number;
  area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  floor?: number | null;
  city: string;
  district: string;
  address?: string;
  lat?: number | null;
  lng?: number | null;
  images: string[];
  videoUrl?: string | null;
  videoLinks?: string[];
  files?: string[];
  features: string[];
  isFeatured?: boolean;
  viewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  developerId?: string;
  projectId?: string;
}

export interface Project {
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
  files: ProjectFile[];
  status: ProjectStatus;
  approvalStatus: ApprovalStatus;
  rejectionReason: string | null;
  completionPercent: number;
  unitTypes: UnitType[];
  paymentPlans: PaymentPlan[];
  features: string[];
  totalUnits: number;
  deliveryDate: string;
  startingPrice: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  developer?: {
    companyName: string;
    logoUrl: string | null;
  };
  properties?: ProjectProperty[];
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
  approvalStatus?: string;
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: Project[];
    pagination: ProjectsPagination;
  };
}

export interface GetProjectResponse {
  success: boolean;
  message: string;
  data: {
    project: Project;
  };
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  city: string;
  address: string;
  status: ProjectStatus;
  startingPrice: number;
  completionPercent: number;
  totalUnits: number;
  deliveryDate: string;
  lat?: number;
  lng?: number;
  images?: File[];
  logo?: File;
  videoUrl?: string;
  videoLinks?: string[];
  features?: string[];
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  city?: string;
  address?: string;
  status?: ProjectStatus;
  startingPrice?: number;
  completionPercent?: number;
  totalUnits?: number;
  deliveryDate?: string;
  lat?: number;
  lng?: number;
  logo?: string | File;
  image?: string | File;
  features?: string[];
  videoLinks?: string[];
}

export interface ResubmitProjectPayload {
  name?: string;
  description?: string;
  city?: string;
  address?: string;
  images?: File[];
  logo?: File;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toFormData = (payload: CreateProjectPayload): FormData => {
  const fd = new FormData();
  fd.append("name", payload.name);
  fd.append("description", payload.description);
  fd.append("city", payload.city);
  fd.append("address", payload.address);
  fd.append("status", payload.status);
  fd.append("startingPrice", String(payload.startingPrice));
  fd.append("completionPercent", String(payload.completionPercent));
  fd.append("totalUnits", String(payload.totalUnits));
  fd.append("deliveryDate", payload.deliveryDate);
  if (payload.lat !== undefined) fd.append("lat", String(payload.lat));
  if (payload.lng !== undefined) fd.append("lng", String(payload.lng));
  if (payload.videoUrl) fd.append("videoUrl", payload.videoUrl);
  payload.videoLinks?.forEach((link) => fd.append("videoLinks[]", link));
  payload.features?.forEach((f) => fd.append("features[]", f));
  payload.images?.forEach((img) => fd.append("images", img));
  if (payload.logo) fd.append("logo", payload.logo);
  return fd;
};

// ─── Service Functions ────────────────────────────────────────────────────────

export const getDeveloperProjects = async (
  params: GetProjectsParams = {},
): Promise<GetProjectsResponse> => {
  const { page = 1, limit = 10, search, status, approvalStatus } = params;
  const response = await api.get<GetProjectsResponse>(
    "/api/v1/projects/developer/projects",
    {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(status && { status }),
        ...(approvalStatus && { approvalStatus }),
      },
    },
  );
  return response.data;
};

export const getDeveloperProjectById = async (
  id: string,
): Promise<GetProjectResponse> => {
  const response = await api.get<GetProjectResponse>(
    `/api/v1/projects/developer/projects/${id}`,
  );
  return response.data;
};

export const createDeveloperProject = async (
  payload: CreateProjectPayload,
): Promise<GetProjectResponse> => {
  const fd = toFormData(payload);
  const response = await api.post<GetProjectResponse>(
    "/api/v1/projects/developer/projects",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

export const updateDeveloperProject = async (
  id: string,
  payload: UpdateProjectPayload,
): Promise<GetProjectResponse> => {
  const hasFile = payload.logo instanceof File || payload.image instanceof File;
  let body: FormData | UpdateProjectPayload;
  let headers: Record<string, string> = {};

  if (hasFile) {
    const fd = new FormData();
    if (payload.name) fd.append("name", payload.name);
    if (payload.description) fd.append("description", payload.description);
    if (payload.city) fd.append("city", payload.city);
    if (payload.address) fd.append("address", payload.address);
    if (payload.status) fd.append("status", payload.status);
    if (payload.startingPrice !== undefined)
      fd.append("startingPrice", String(payload.startingPrice));
    if (payload.completionPercent !== undefined)
      fd.append("completionPercent", String(payload.completionPercent));
    if (payload.totalUnits !== undefined)
      fd.append("totalUnits", String(payload.totalUnits));
    if (payload.deliveryDate) fd.append("deliveryDate", payload.deliveryDate);
    if (payload.lat !== undefined) fd.append("lat", String(payload.lat));
    if (payload.lng !== undefined) fd.append("lng", String(payload.lng));
    if (payload.logo instanceof File) fd.append("logo", payload.logo);
    if (payload.image instanceof File) fd.append("image", payload.image);
    payload.features?.forEach((f) => fd.append("features[]", f));
    payload.videoLinks?.forEach((l) => fd.append("videoLinks[]", l));
    body = fd;
    headers = { "Content-Type": "multipart/form-data" };
  } else {
    body = payload;
  }

  const response = await api.put<GetProjectResponse>(
    `/api/v1/projects/developer/projects/${id}`,
    body,
    { headers },
  );
  return response.data;
};

export const deleteDeveloperProject = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(
    `/api/v1/projects/developer/projects/${id}`,
  );
  return response.data;
};

export const resubmitDeveloperProject = async (
  id: string,
  payload?: ResubmitProjectPayload,
): Promise<GetProjectResponse> => {
  const fd = new FormData();
  if (payload) {
    if (payload.name) fd.append("name", payload.name);
    if (payload.description) fd.append("description", payload.description);
    if (payload.city) fd.append("city", payload.city);
    if (payload.address) fd.append("address", payload.address);
    payload.images?.forEach((img) => fd.append("images", img));
    if (payload.logo) fd.append("logo", payload.logo);
  }
  const response = await api.post<GetProjectResponse>(
    `/api/v1/projects/developer/projects/${id}/resubmit`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};
