import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PropertyType =
  | "apartment"
  | "villa"
  | "duplex"
  | "land"
  | "commercial"
  | "office"
  | "warehouse";

export type PropertyStatus = "available" | "sold" | "reserved";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  area: number;
  status: PropertyStatus;
  approvalStatus: ApprovalStatus;
  rejectionReason: string | null;
  bedrooms: number;
  bathrooms: number;
  floor: number | null;
  city: string;
  district: string;
  address: string;
  images: string[];
  files: string[];
  projectId: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  developerId: string;
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
  city?: string;
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
    property: Property;
  };
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  area: number;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  city: string;
  district: string;
  address: string;
  projectId?: string;
  images?: File[];
  files?: File[];
  features?: string[];
  videoLinks?: string[];
}

export interface UpdatePropertyPayload {
  title?: string;
  description?: string;
  type?: PropertyType;
  price?: number;
  area?: number;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  city?: string;
  district?: string;
  address?: string;
  images?: (File | string)[];
  files?: (File | string)[];
  features?: string[];
  videoLinks?: string[];
}

export interface ResubmitPropertyPayload {
  title?: string;
  description?: string;
  city?: string;
  address?: string;
  images?: File[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toFormData = (payload: CreatePropertyPayload): FormData => {
  const fd = new FormData();

  fd.append("title", payload.title);
  fd.append("description", payload.description);
  fd.append("type", payload.type);
  fd.append("price", String(payload.price));
  fd.append("area", String(payload.area));
  fd.append("status", payload.status);
  fd.append("city", payload.city);
  fd.append("district", payload.district);
  fd.append("address", payload.address);

  if (payload.bedrooms !== undefined)
    fd.append("bedrooms", String(payload.bedrooms));
  if (payload.bathrooms !== undefined)
    fd.append("bathrooms", String(payload.bathrooms));
  if (payload.floor !== undefined) fd.append("floor", String(payload.floor));
  if (payload.projectId) fd.append("projectId", payload.projectId);

  payload.features?.forEach((f) => fd.append("features[]", f));
  payload.videoLinks?.forEach((l) => fd.append("videoLinks[]", l));
  payload.images?.forEach((img) => fd.append("images", img));
  payload.files?.forEach((file) => fd.append("files", file));

  return fd;
};

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * GET /api/v1/properties/developer/properties
 */
export const getDeveloperProperties = async (
  params: GetPropertiesParams = {},
): Promise<GetPropertiesResponse> => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    approvalStatus,
    type,
    city,
  } = params;

  const response = await api.get<GetPropertiesResponse>(
    "/api/v1/properties/developer/properties",
    {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(status && { status }),
        ...(approvalStatus && { approvalStatus }),
        ...(type && { type }),
        ...(city && { city }),
      },
    },
  );

  return response.data;
};

/**
 * GET /api/v1/properties/developer/properties/:id
 */
export const getDeveloperPropertyById = async (
  id: string,
): Promise<GetPropertyResponse> => {
  const response = await api.get<GetPropertyResponse>(
    `/api/v1/properties/developer/properties/${id}`,
  );
  return response.data;
};

/**
 * POST /api/v1/properties/developer/properties
 */
export const createDeveloperProperty = async (
  payload: CreatePropertyPayload,
): Promise<GetPropertyResponse> => {
  const fd = toFormData(payload);

  const response = await api.post<GetPropertyResponse>(
    "/api/v1/properties/developer/properties",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
};

/**
 * PUT /api/v1/properties/developer/properties/:id
 */
// export const updateDeveloperProperty = async (
//   id: string,
//   payload: UpdatePropertyPayload,
// ): Promise<GetPropertyResponse> => {
//   const hasFile =
//     payload.images?.some((img) => img instanceof File) ||
//     payload.files?.some((f) => f instanceof File);

//   let body: FormData | UpdatePropertyPayload;
//   let headers: Record<string, string> = {};

//   if (hasFile) {
//     const fd = new FormData();

//     if (payload.title) fd.append("title", payload.title);
//     if (payload.description) fd.append("description", payload.description);
//     if (payload.type) fd.append("type", payload.type);
//     if (payload.price !== undefined) fd.append("price", String(payload.price));
//     if (payload.area !== undefined) fd.append("area", String(payload.area));
//     if (payload.status) fd.append("status", payload.status);
//     if (payload.city) fd.append("city", payload.city);
//     if (payload.district) fd.append("district", payload.district);
//     if (payload.address) fd.append("address", payload.address);
//     if (payload.bedrooms !== undefined)
//       fd.append("bedrooms", String(payload.bedrooms));
//     if (payload.bathrooms !== undefined)
//       fd.append("bathrooms", String(payload.bathrooms));
//     if (payload.floor !== undefined) fd.append("floor", String(payload.floor));

//     payload.features?.forEach((f) => fd.append("features[]", f));
//     payload.videoLinks?.forEach((l) => fd.append("videoLinks[]", l));
//     payload.images?.forEach((img) => {
//       if (img instanceof File) fd.append("images", img);
//       else fd.append("existingImages[]", img);
//     });
//     payload.files?.forEach((file) => {
//       if (file instanceof File) fd.append("files", file);
//       else fd.append("existingFiles[]", file);
//     });

//     body = fd;
//     headers = { "Content-Type": "multipart/form-data" };
//   } else {
//     body = payload;
//   }

//   const response = await api.put<GetPropertyResponse>(
//     `/api/v1/properties/developer/properties/${id}`,
//     body,
//     { headers },
//   );

//   return response.data;
// };
export const updateDeveloperProperty = async (
  id: string,
  payload: UpdatePropertyPayload,
): Promise<GetPropertyResponse> => {
  const fd = new FormData();

  if (payload.title) fd.append("title", payload.title);
  if (payload.description) fd.append("description", payload.description);
  if (payload.type) fd.append("type", payload.type);
  if (payload.price !== undefined) fd.append("price", String(payload.price));
  if (payload.area !== undefined) fd.append("area", String(payload.area));
  if (payload.status) fd.append("status", payload.status);
  if (payload.city) fd.append("city", payload.city);
  if (payload.district) fd.append("district", payload.district);
  if (payload.address) fd.append("address", payload.address);
  if (payload.bedrooms !== undefined)
    fd.append("bedrooms", String(payload.bedrooms));
  if (payload.bathrooms !== undefined)
    fd.append("bathrooms", String(payload.bathrooms));
  if (payload.floor !== undefined) fd.append("floor", String(payload.floor));

  payload.features?.forEach((f) => fd.append("features[]", f));
  payload.videoLinks?.forEach((l) => fd.append("videoLinks[]", l));

  payload.images?.forEach((img) => {
    if (img instanceof File) fd.append("images", img);
    else fd.append("existingImages[]", img);
  });

  payload.files?.forEach((file) => {
    if (file instanceof File) fd.append("files", file);
    else fd.append("existingFiles[]", file);
  });

  const response = await api.put<GetPropertyResponse>(
    `/api/v1/properties/developer/properties/${id}`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
};
/**
 * DELETE /api/v1/properties/developer/properties/:id
 */
export const deleteDeveloperProperty = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(
    `/api/v1/properties/developer/properties/${id}`,
  );
  return response.data;
};

/**
 * POST /api/v1/properties/developer/properties/:id/resubmit
 */
export const resubmitDeveloperProperty = async (
  id: string,
  payload?: ResubmitPropertyPayload,
): Promise<GetPropertyResponse> => {
  const fd = new FormData();

  if (payload) {
    if (payload.title) fd.append("title", payload.title);
    if (payload.description) fd.append("description", payload.description);
    if (payload.city) fd.append("city", payload.city);
    if (payload.address) fd.append("address", payload.address);
    payload.images?.forEach((img) => fd.append("images", img));
  }

  const response = await api.post<GetPropertyResponse>(
    `/api/v1/properties/developer/properties/${id}/resubmit`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
};
