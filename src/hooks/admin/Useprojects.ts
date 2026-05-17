import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  getProjects,
  featureProject,
  deleteProject,
  GetProjectsParams,
} from "@/services/admin/Projectsservice";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const projectsKeys = {
  all: ["projects"] as const,
  list: (params: GetProjectsParams) => ["projects", "list", params] as const,
  detail: (id: string) => ["projects", "detail", id] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useGetProjects = (params: GetProjectsParams = {}) => {
  return useQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () => getProjects(params),
  });
};

// ─── Feature ──────────────────────────────────────────────────────────────────

export const useFeatureProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await featureProject(id);
    },
    onSuccess: () => {
      toast.success("تم تحديث حالة التميز بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Delete ───────────────────────────────────────────────────────────────────

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteProject(id);
    },
    onSuccess: () => {
      toast.success("تم حذف المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
