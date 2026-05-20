import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  updateSettings,
  addCity,
  deleteCity,
  addFeature,
  deleteFeature,
  UpdateSettingsPayload,
} from "@/services/admin/Settingsservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const settingsKeys = {
  all: ["settings"] as const,
  settings: ["settings", "site"] as const,
};

// ─── Get Settings ─────────────────────────────────────────────────────────────

export const useGetSettings = () => {
  return useQuery({
    queryKey: settingsKeys.settings,
    queryFn: getSettings,
  });
};

// ─── Update Settings ──────────────────────────────────────────────────────────

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    UpdateSettingsPayload
  >({
    mutationFn: async (payload) => {
      await updateSettings(payload);
    },
    onSuccess: () => {
      toast.success("تم حفظ الإعدادات بنجاح");
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Add City ─────────────────────────────────────────────────────────────────

export const useAddCity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (name) => {
      await addCity(name);
    },
    onSuccess: () => {
      toast.success("تمت إضافة المدينة بنجاح");
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    },
  });
};

// ─── Delete City ──────────────────────────────────────────────────────────────

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (name) => {
      await deleteCity(name);
    },
    onSuccess: () => {
      toast.success("تم حذف المدينة بنجاح");
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    },
  });
};

// ─── Add Feature ──────────────────────────────────────────────────────────────

export const useAddFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (name) => {
      await addFeature(name);
    },
    onSuccess: () => {
      toast.success("تمت إضافة الميزة بنجاح");
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    },
  });
};

// ─── Delete Feature ───────────────────────────────────────────────────────────

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (name) => {
      await deleteFeature(name);
    },
    onSuccess: () => {
      toast.success("تم حذف الميزة بنجاح");
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    },
  });
};
