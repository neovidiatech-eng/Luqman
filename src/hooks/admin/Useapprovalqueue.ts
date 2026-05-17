import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  approveProperty,
  rejectProperty,
  approveProject,
  rejectProject,
  getApprovalQueue,
  getPendingProjects,
  getPendingProperties,
} from "@/services/admin/Approvalqueueservice";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const approvalQueueKeys = {
  all: ["approval-queue"] as const,
  queue: () => ["approval-queue", "all"] as const,
  properties: () => ["approval-queue", "properties"] as const,
  projects: () => ["approval-queue", "projects"] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useGetApprovalQueue = () => {
  return useQuery({
    queryKey: approvalQueueKeys.queue(),
    queryFn: getApprovalQueue,
  });
};

export const useGetPendingProperties = () => {
  return useQuery({
    queryKey: approvalQueueKeys.properties(),
    queryFn: getPendingProperties,
  });
};

export const useGetPendingProjects = () => {
  return useQuery({
    queryKey: approvalQueueKeys.projects(),
    queryFn: getPendingProjects,
  });
};

// ─── Property Mutations ───────────────────────────────────────────────────────

export const useApproveProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await approveProperty(id);
    },
    onSuccess: () => {
      toast.success("تمت الموافقة على العقار بنجاح");
      queryClient.invalidateQueries({ queryKey: approvalQueueKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

export const useRejectProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      await rejectProperty(id, reason);
    },
    onSuccess: () => {
      toast.success("تم رفض العقار وإرسال السبب للمطور");
      queryClient.invalidateQueries({ queryKey: approvalQueueKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Project Mutations ────────────────────────────────────────────────────────

export const useApproveProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await approveProject(id);
    },
    onSuccess: () => {
      toast.success("تمت الموافقة على المشروع بنجاح");
      queryClient.invalidateQueries({ queryKey: approvalQueueKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

export const useRejectProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      await rejectProject(id, reason);
    },
    onSuccess: () => {
      toast.success("تم رفض المشروع وإرسال السبب للمطور");
      queryClient.invalidateQueries({ queryKey: approvalQueueKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
