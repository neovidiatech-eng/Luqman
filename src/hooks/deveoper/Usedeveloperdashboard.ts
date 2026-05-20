import { useQuery } from "@tanstack/react-query";
import { getDeveloperDashboard } from "@/services/developer/Dashboardservice";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const developerDashboardKeys = {
  all: ["developer-dashboard"] as const,
  stats: () => ["developer-dashboard", "stats"] as const,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useDeveloperDashboard = () => {
  return useQuery({
    queryKey: developerDashboardKeys.stats(),
    queryFn: getDeveloperDashboard,
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
