import api from "@/lib/axios";
import { ContactSubmitData, ContactSubmitResponse } from "./ContactService";

export type ProjectContactData = Omit<ContactSubmitData, 'propertyId' | 'projectId'>;
export type ProjectContactResponse = ContactSubmitResponse;

export const submitProjectContact = async (
  projectId: string,
  data: ProjectContactData
): Promise<ProjectContactResponse> => {
  const response = await api.post<ProjectContactResponse>("/api/v1/contact", {
    ...data,
    projectId,
  });
  return response.data;
};
