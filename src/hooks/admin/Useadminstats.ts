import {
  getAdminStats,
  getContactsChart,
} from "@/services/admin/Adminstatsservice";
import { useQuery } from "@tanstack/react-query";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const adminStatsKeys = {
  all: ["admin", "stats"] as const,
  stats: () => [...adminStatsKeys.all, "overview"] as const,
  contactsChart: () => [...adminStatsKeys.all, "contacts-chart"] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns the main stats block (properties / projects / developers / contacts) */
export const useAdminStats = () => {
  return useQuery({
    queryKey: adminStatsKeys.stats(),
    queryFn: getAdminStats,
    staleTime: 1000 * 60 * 5, // 5 دقايق
  });
};

/** Returns labels + data array for the contacts chart */
export const useContactsChart = () => {
  return useQuery({
    queryKey: adminStatsKeys.contactsChart(),
    queryFn: getContactsChart,
    staleTime: 1000 * 60 * 5,
  });
};
