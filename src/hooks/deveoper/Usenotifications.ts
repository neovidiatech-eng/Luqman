import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  deleteAllNotifications,
} from "@/services/developer/Notificationsservice";
// أضف في Usenotifications.ts

import { AxiosError } from "axios";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const notificationsKeys = {
  all: ["notifications"] as const,
  list: () => ["notifications", "list"] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export const useGetNotifications = () => {
  return useQuery({
    queryKey: notificationsKeys.list(),
    queryFn: getNotifications,
    select: (res) => res.data.notifications,
    staleTime: 1000 * 60 * 2,
  });
};

// ─── Mark Single Read Hook ────────────────────────────────────────────────────

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};

// ─── Mark All Read Hook ───────────────────────────────────────────────────────

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    void
  >({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};

// ─── Delete Single ────────────────────────────────────────────────────────────

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};

// ─── Delete All ───────────────────────────────────────────────────────────────

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
};
