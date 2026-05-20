import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDeveloperProperties,
  getDeveloperPropertyById,
  createDeveloperProperty,
  updateDeveloperProperty,
  deleteDeveloperProperty,
  resubmitDeveloperProperty,
  GetPropertiesParams,
  CreatePropertyPayload,
  UpdatePropertyPayload,
  ResubmitPropertyPayload,
} from "@/services/developer/Propertiesservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const propertiesKeys = {
  all: ["developer-properties"] as const,
  list: (params: GetPropertiesParams) =>
    ["developer-properties", "list", params] as const,
  detail: (id: string) => ["developer-properties", "detail", id] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export const useGetDeveloperProperties = (params: GetPropertiesParams = {}) => {
  return useQuery({
    queryKey: propertiesKeys.list(params),
    queryFn: () => getDeveloperProperties(params),
  });
};

// ─── Single Property Hook ─────────────────────────────────────────────────────

export const useGetDeveloperProperty = (id: string | null) => {
  return useQuery({
    queryKey: propertiesKeys.detail(id!),
    queryFn: () => getDeveloperPropertyById(id!),
    enabled: !!id,
  });
};

// ─── Create Property Hook ─────────────────────────────────────────────────────

export const useCreateDeveloperProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof createDeveloperProperty>>,
    AxiosError<{ message: string }>,
    CreatePropertyPayload
  >({
    mutationFn: createDeveloperProperty,
    onSuccess: () => {
      toast.success("تم إضافة العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Update Property Hook ─────────────────────────────────────────────────────

export const useUpdateDeveloperProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof updateDeveloperProperty>>,
    AxiosError<{ message: string }>,
    { id: string; payload: UpdatePropertyPayload }
  >({
    mutationFn: ({ id, payload }) => updateDeveloperProperty(id, payload),
    onSuccess: (_, { id }) => {
      toast.success("تم تحديث العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
      queryClient.invalidateQueries({ queryKey: propertiesKeys.detail(id) });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Delete Property Hook ─────────────────────────────────────────────────────

export const useDeleteDeveloperProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: deleteDeveloperProperty,
    onSuccess: () => {
      toast.success("تم حذف العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Resubmit Property Hook ───────────────────────────────────────────────────

export const useResubmitDeveloperProperty = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof resubmitDeveloperProperty>>,
    AxiosError<{ message: string }>,
    { id: string; payload?: ResubmitPropertyPayload }
  >({
    mutationFn: ({ id, payload }) => resubmitDeveloperProperty(id, payload),
    onSuccess: (_, { id }) => {
      toast.success("تم إعادة تقديم العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: propertiesKeys.all });
      queryClient.invalidateQueries({ queryKey: propertiesKeys.detail(id) });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
