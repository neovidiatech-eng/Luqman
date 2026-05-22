import { useMutation } from "@tanstack/react-query";
import { submitContact, ContactSubmitData, ContactSubmitResponse } from "@/services/public/ContactService";
import { AxiosError } from "axios";

export const useSubmitContact = () => {
  return useMutation<
    ContactSubmitResponse,
    AxiosError<{ message: string }>,
    ContactSubmitData
  >({
    mutationFn: submitContact,
  });
};
