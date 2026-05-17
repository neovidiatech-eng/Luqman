import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProperties,
  getPropertyById,
  featureProperty,
  updatePropertyStatus,
  GetPropertiesParams,
  PropertyStatus,
  deleteProperty,
} from "@/services/admin/Propertiesservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const propertiesKeys = {
  all: ["properties"] as const,
  list: (params: GetPropertiesParams) =>
    ["properties", "list", params] as const,
  detail: (id: string) => ["properties", "detail", id] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export const useGetProperties = (params: GetPropertiesParams = {}) => {
  return useQuery({
    queryKey: propertiesKeys.list(params),
    queryFn: () => getProperties(params),
  });
};

// ─── Single Property Hook ─────────────────────────────────────────────────────

export const useGetProperty = (id: string | null) => {
  return useQuery({
    queryKey: propertiesKeys.detail(id!),
    queryFn: () => getPropertyById(id!),
    enabled: !!id,
  });
};

// ─── Feature Property Hook ────────────────────────────────────────────────────

export const useFeatureProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (id) => {
      await featureProperty(id);
    },
    onSuccess: () => {
      toast.success("تم تحديث حالة التميز بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Update Property Status Hook ──────────────────────────────────────────────

export const useUpdatePropertyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: PropertyStatus;
    }) => {
      await updatePropertyStatus(id, status);
    },
    onSuccess: () => {
      toast.success("تم تحديث حالة العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteProperty(id);
    },
    onSuccess: () => {
      toast.success("تم حذف العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
