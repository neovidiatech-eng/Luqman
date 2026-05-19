import { useQuery } from "@tanstack/react-query";
import { getProjects, getProject } from "@/services/public/ProjectsService";

export const useProjects = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ["projects", params],
        queryFn: () => getProjects(params),
    });
};

export const useGetProject = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });
};
