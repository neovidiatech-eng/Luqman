// ─── Types ────────────────────────────────────────────────────────────────────

import api from "@/lib/axios";

export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: {
    properties: {
      total: number;
      published: number;
      pending: number;
      rejected: number;
    };
    projects: {
      total: number;
      published: number;
      pending: number;
    };
    developers: {
      total: number;
      active: number;
      pending: number;
    };
    contacts: {
      total: number;
      new: number;
      today: number;
    };
  };
}

export interface ContactsChartResponse {
  success: boolean;
  message: string;
  data: {
    labels: string[];
    data: number[];
  };
}

// ─── Service Functions ────────────────────────────────────────────────────────

/** GET /api/v1/admin/stats */
export const getAdminStats = async (): Promise<AdminStatsResponse["data"]> => {
  const response = await api.get<AdminStatsResponse>("/api/v1/admin/stats");
  return response.data.data;
};

/** GET /api/v1/admin/stats/contacts-chart */
export const getContactsChart = async (): Promise<
  ContactsChartResponse["data"]
> => {
  const response = await api.get<ContactsChartResponse>(
    "/api/v1/admin/stats/contacts-chart",
  );
  return response.data.data;
};
