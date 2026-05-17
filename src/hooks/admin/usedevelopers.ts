import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateDeveloper,
  deleteDeveloper,
  disableDeveloper,
  getDevelopers,
  GetDevelopersParams,
} from "@/services/admin/Developersservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const developersKeys = {
  all: ["developers"] as const,
  list: (params: GetDevelopersParams) => ["developers", params] as const,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useGetDevelopers = (params: GetDevelopersParams = {}) => {
  return useQuery({
    queryKey: developersKeys.list(params),
    queryFn: () => getDevelopers(params),
  });
};

export const useToggleDeveloperStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    { id: string; currentStatus: string }
  >({
    mutationFn: async ({ id, currentStatus }) => {
      if (currentStatus === "active") {
        await disableDeveloper(id);
      } else {
        await activateDeveloper(id);
      }
    },

    onSuccess: (_, { currentStatus }) => {
      const newStatus = currentStatus === "active" ? "موقوف" : "نشط";
      toast.success(`تم تغيير حالة الحساب إلى ${newStatus}`);
      queryClient.invalidateQueries({ queryKey: developersKeys.all });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

export const useDeleteDeveloper = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: deleteDeveloper,

    onSuccess: () => {
      toast.success("تم حذف المطور بنجاح");
      queryClient.invalidateQueries({ queryKey: developersKeys.all });
    },

    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
