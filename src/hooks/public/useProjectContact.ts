import { useMutation } from "@tanstack/react-query";
import {
  submitProjectContact,
  ProjectContactData,
  ProjectContactResponse,
} from "@/services/public/ProjectContactService";
import { AxiosError } from "axios";

export const useSubmitProjectContact = () => {
  return useMutation<
    ProjectContactResponse,
    AxiosError<{ message: string }>,
    { projectId: string; data: ProjectContactData }
  >({
    mutationFn: ({ projectId, data }) => submitProjectContact(projectId, data),
  });
};
