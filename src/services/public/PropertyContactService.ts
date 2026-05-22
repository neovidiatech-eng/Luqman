import api from "@/lib/axios";
import { ContactSubmitData, ContactSubmitResponse } from "./ContactService";

export type PropertyContactData = Omit<ContactSubmitData, 'propertyId' | 'projectId'>;
export type PropertyContactResponse = ContactSubmitResponse;

export const submitPropertyContact = async (
  propertyId: string,
  data: PropertyContactData
): Promise<PropertyContactResponse> => {
  const response = await api.post<PropertyContactResponse>("/api/v1/contact", {
    ...data,
    propertyId,
  });
  return response.data;
};
