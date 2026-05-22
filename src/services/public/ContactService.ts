import api from "@/lib/axios";

export interface ContactSubmitData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  propertyId?: string | null;
  projectId?: string | null;
}

export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitContact = async (
  data: ContactSubmitData
): Promise<ContactSubmitResponse> => {
  const response = await api.post<ContactSubmitResponse>("/api/v1/contact", data);
  return response.data;
};
