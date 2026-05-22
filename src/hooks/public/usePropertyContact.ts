import { useMutation } from "@tanstack/react-query";
import {
  submitPropertyContact,
  PropertyContactData,
  PropertyContactResponse,
} from "@/services/public/PropertyContactService";
import { AxiosError } from "axios";

export const useSubmitPropertyContact = () => {
  return useMutation<
    PropertyContactResponse,
    AxiosError<{ message: string }>,
    { propertyId: string; data: PropertyContactData }
  >({
    mutationFn: ({ propertyId, data }) => submitPropertyContact(propertyId, data),
  });
};
