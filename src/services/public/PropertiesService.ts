import api from "@/lib/axios";
import { Property, Project } from "@/lib/types";

export interface HomeStats {
    totalProperties: number;
    totalProjects: number;
    totalDevelopers: number;
}

export interface GetHomeDataResponse {
    success: boolean;
    message: string;
    data: {
        featuredProjects: Project[];
        latestProperties: Property[];
        stats: HomeStats;
    }
}

import { mapApiProjectToProject } from "./ProjectsService";

export const getHomeData = async (): Promise<GetHomeDataResponse> => {
    const response = await api.get<any>("/api/v1/properties/home");
    const rawProjects = response.data?.data?.featuredProjects || [];
    const mappedProjects = rawProjects.map((p: any) => mapApiProjectToProject(p));
    
    return {
        ...response.data,
        data: {
            ...response.data.data,
            featuredProjects: mappedProjects
        }
    };
};

export interface GetPropertiesParams {
    page?: number;
    limit?: number;
    city?: string;
    type?: string;
    district?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    search?: string;
}

export interface GetPropertiesResponse {
    success: boolean;
    message: string;
    data: {
        properties: Property[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }
}

export const getProperties = async (params: GetPropertiesParams = {}): Promise<GetPropertiesResponse> => {
    const response = await api.get<GetPropertiesResponse>("/api/v1/properties", { params });
    return response.data;
};

export interface GetPropertyResponse {
    success: boolean;
    message: string;
    data: Property;
}

export const getPropertyById = async (id: string): Promise<GetPropertyResponse> => {
    const response = await api.get<GetPropertyResponse>(`/api/v1/properties/${id}`);
    return response.data;
};
