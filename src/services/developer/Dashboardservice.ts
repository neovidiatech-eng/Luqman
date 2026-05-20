import axiosInstance from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DeveloperDashboardNotification {
  id: string;
  title: string;
  approvalStatus: "approved" | "pending" | "rejected";
  rejectionReason: string | null;
  updatedAt: string;
}

export interface DeveloperDashboardStats {
  properties: {
    approved: number;
    pending: number;
    rejected: number;
  };
  projects: {
    approved: number;
    pending: number;
    rejected: number;
  };
  totalLeads: number;
  totalViews: number;
  notifications: DeveloperDashboardNotification[];
}

export interface DeveloperDashboardResponse {
  success: boolean;
  message: string;
  data: DeveloperDashboardStats;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const getDeveloperDashboard =
  async (): Promise<DeveloperDashboardResponse> => {
    const { data } = await axiosInstance.get<DeveloperDashboardResponse>(
      "/api/v1/developer/dashboard",
    );
    return data;
  };
