// ─── Types ────────────────────────────────────────────────────────────────────

import api from "@/lib/axios";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "approval" | "rejection" | "info";
  isRead: boolean;
  propertyTitle?: string;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Notification[];
  };
}

export interface MarkReadResponse {
  success: boolean;
  message: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getNotifications = async (): Promise<NotificationsResponse> => {
  const { data } = await api.get<NotificationsResponse>(
    "/api/v1/notifications",
  );
  return data;
};

export const markNotificationRead = async (
  id: string,
): Promise<MarkReadResponse> => {
  const { data } = await api.patch<MarkReadResponse>(
    `/api/v1/notifications/${id}/read`,
  );
  return data;
};

export const markAllNotificationsRead = async (): Promise<MarkReadResponse> => {
  const { data } = await api.patch<MarkReadResponse>(
    "/api/v1/notifications/read-all",
  );
  return data;
};

// أضف في Notificationsservice.ts

export const deleteNotification = async (
  id: string,
): Promise<MarkReadResponse> => {
  const { data } = await api.delete<MarkReadResponse>(
    `/api/v1/notifications/${id}`,
  );
  return data;
};

export const deleteAllNotifications = async (): Promise<MarkReadResponse> => {
  const { data } = await api.delete("/api/v1/notifications/delete-all");
  return data;
};
