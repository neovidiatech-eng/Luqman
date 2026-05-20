import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDeveloperProjects,
  getDeveloperProjectById,
  createDeveloperProject,
  updateDeveloperProject,
  deleteDeveloperProject,
  resubmitDeveloperProject,
  GetProjectsParams,
  CreateProjectPayload,
  UpdateProjectPayload,
  ResubmitProjectPayload,
} from "@/services/developer/Projectsservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const projectsKeys = {
  all: ["developer-projects"] as const,
  list: (params: GetProjectsParams) =>
    ["developer-projects", "list", params] as const,
  detail: (id: string) => ["developer-projects", "detail", id] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export const useGetDeveloperProjects = (params: GetProjectsParams = {}) => {
  return useQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () => getDeveloperProjects(params),
  });
};

// ─── Single Project Hook ──────────────────────────────────────────────────────

export const useGetDeveloperProject = (id: string | null) => {
  return useQuery({
    queryKey: projectsKeys.detail(id!),
    queryFn: () => getDeveloperProjectById(id!),
    enabled: !!id,
  });
};

// ─── Create Project Hook ──────────────────────────────────────────────────────

export const useCreateDeveloperProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof createDeveloperProject>>,
    AxiosError<{ message: string }>,
    CreateProjectPayload
  >({
    mutationFn: createDeveloperProject,
    onSuccess: () => {
      toast.success("تم إضافة المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Update Project Hook ──────────────────────────────────────────────────────

export const useUpdateDeveloperProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof updateDeveloperProject>>,
    AxiosError<{ message: string }>,
    { id: string; payload: UpdateProjectPayload }
  >({
    mutationFn: ({ id, payload }) => updateDeveloperProject(id, payload),
    onSuccess: (_, { id }) => {
      toast.success("تم تحديث المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
      queryClient.invalidateQueries({ queryKey: projectsKeys.detail(id) });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Delete Project Hook ──────────────────────────────────────────────────────

export const useDeleteDeveloperProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: deleteDeveloperProject,
    onSuccess: () => {
      toast.success("تم حذف المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Resubmit Project Hook ────────────────────────────────────────────────────

export const useResubmitDeveloperProject = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof resubmitDeveloperProject>>,
    AxiosError<{ message: string }>,
    { id: string; payload?: ResubmitProjectPayload }
  >({
    mutationFn: ({ id, payload }) => resubmitDeveloperProject(id, payload),
    onSuccess: (_, { id }) => {
      toast.success("تم إعادة تقديم المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: projectsKeys.all });
      queryClient.invalidateQueries({ queryKey: projectsKeys.detail(id) });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
