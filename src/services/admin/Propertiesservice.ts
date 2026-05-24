import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropertyFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  status: "available" | "reserved" | "sold";
  approvalStatus: "pending" | "approved" | "rejected";
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
  files: PropertyFile[];
  features: string[];
  isFeatured: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  developerId: string;
  projectId: string | null;
  developer: {
    companyName: string;
  };
}

export interface PropertyDetails extends Property {
  developer: {
    companyName: string;
    logoUrl: string | null;
    phone: string;
  };
  project: {
    id: string;
    name: string;
    city: string;
  } | null;
}

export interface PropertiesPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  approvalStatus?: string;
  type?: string;
}

export interface GetPropertiesResponse {
  success: boolean;
  message: string;
  data: {
    properties: Property[];
    pagination: PropertiesPagination;
  };
}

export interface GetPropertyResponse {
  success: boolean;
  message: string;
  data: {
    property: PropertyDetails;
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getProperties = async (
  params: GetPropertiesParams = {},
): Promise<GetPropertiesResponse> => {
  const { page = 1, limit = 10, search, status, approvalStatus, type } = params;

  const response = await api.get<GetPropertiesResponse>(
    "/api/v1/admin/properties",
    {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(status && { status }),
        ...(approvalStatus && { approvalStatus }),
        ...(type && { type }),
      },
    },
  );

  return response.data;
};

export const getPropertyById = async (
  id: string,
): Promise<GetPropertyResponse> => {
  const response = await api.get<GetPropertyResponse>(
    `/api/v1/admin/properties/${id}`,
  );
  return response.data;
};

export interface FeaturePropertyResponse {
  success: boolean;
  message: string;
  data: { property: Property };
}

/** PATCH /api/v1/admin/properties/:id/feature */
export const featureProperty = async (
  id: string,
): Promise<FeaturePropertyResponse> => {
  const response = await api.patch<FeaturePropertyResponse>(
    `/api/v1/admin/properties/${id}/feature`,
  );
  return response.data;
};

export type PropertyStatus = "available" | "reserved" | "sold";

export interface UpdatePropertyStatusResponse {
  success: boolean;
  message: string;
  data: { property: Property };
}

/** PATCH /api/v1/admin/properties/:id/status */
export const updatePropertyStatus = async (
  id: string,
  status: PropertyStatus,
): Promise<UpdatePropertyStatusResponse> => {
  const response = await api.patch<UpdatePropertyStatusResponse>(
    `/api/v1/admin/properties/${id}/status`,
    { status },
  );
  return response.data;
};

/** DELETE /api/v1/admin/properties/:id */
export const deleteProperty = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/api/v1/admin/properties/${id}`);
  return response.data;
};
