import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactStatus = "new" | "read" | "replied";

export interface ContactProperty {
  title: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: ContactStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  propertyId: string | null;
  projectId: string | null;
  property: ContactProperty | null;
  project: { name: string } | null;
}

export interface ContactsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetContactsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface GetContactsResponse {
  success: boolean;
  message: string;
  data: {
    contacts: Contact[];
    pagination: ContactsPagination;
  };
}

export interface UpdateContactNotesResponse {
  success: boolean;
  message: string;
  data: { contact: Contact };
}

// ─── Service ──────────────────────────────────────────────────────────────────

/** GET /api/v1/admin/contacts */
export const getContacts = async (
  params: GetContactsParams = {},
): Promise<GetContactsResponse> => {
  const { page = 1, limit = 10, search, status } = params;

  const response = await api.get<GetContactsResponse>(
    "/api/v1/admin/contacts",
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

/** GET /api/v1/admin/contacts/export  → blob (Excel) */
export const exportContacts = async (): Promise<Blob> => {
  const response = await api.get("/api/v1/admin/contacts/export", {
    responseType: "blob",
  });
  return response.data;
};

/** PUT /api/v1/admin/contacts/:id/notes */
export const updateContactNotes = async (
  id: string,
  adminNotes: string,
): Promise<UpdateContactNotesResponse> => {
  const response = await api.put<UpdateContactNotesResponse>(
    `/api/v1/admin/contacts/${id}/notes`,
    { adminNotes },
  );
  return response.data;
};

/** DELETE /api/v1/admin/contacts/:id */
export const deleteContact = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/api/v1/admin/contacts/${id}`);
  return response.data;
};
