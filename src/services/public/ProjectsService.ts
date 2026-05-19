import api from "@/lib/axios"
import { Project } from "@/lib/types"

//_____Types_____
export interface PaymentPlan {
    label: string;
    details: string;
}

export interface ProjectDeveloper {
    companyName: string;
    logoUrl: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ApiProject {
    id: string;
    name: string;
    logoUrl: string | null;
    description?: string;
    desccription?: string;
    city: string;
    address: string;
    lat: number | null;
    lng: number | null;
    images: string[] | null;
    videoUrl: string | null;
    videoLinks?: string[];
    files: string[];
    status: string;
    approvalStatus: string;
    rejectionReason: string | null;
    completionPercent: number;
    completionPercentage?: number;
    paymentPlans?: any;
    features: string[];
    totalUnits: number;
    availableUnits?: number;
    deliveryDate: string;
    startingPrice: number;
    isFeatured?: boolean;
    featured?: boolean;
    createdAt: string;
    updatedAt: string;
    developerId: string;
    developer?: {
        companyName: string;
    };
    developerName?: string;
    units?: any[];
}

export interface GetProjectsResponse {
    success: boolean;
    message: string;
    data: {
        projects: Project[];
        pagination: Pagination;
    };
}

export interface GetProjectResponse {
    success: boolean;
    message: string;
    data: Project;
}

//_____Mapper_____
export const mapApiProjectToProject = (apiProj: any): Project => {
    // Determine the images list with logoUrl as fallback if no images are present
    let projectImages: string[] = [];
    if (Array.isArray(apiProj.images) && apiProj.images.length > 0) {
        projectImages = apiProj.images.filter((img: any) => typeof img === 'string' && img !== "");
    }
    
    // Fallback to logoUrl if images list is empty
    if (projectImages.length === 0 && apiProj.logoUrl && apiProj.logoUrl !== "") {
        projectImages = [apiProj.logoUrl];
    }

    return {
        id: apiProj.id,
        name: apiProj.name,
        description: apiProj.description || apiProj.desccription || "",
        city: apiProj.city,
        status: (apiProj.status === "under_construction" || apiProj.status === "completed" || apiProj.status === "development") 
            ? apiProj.status 
            : "under_construction",
        completionPercentage: apiProj.completionPercentage !== undefined 
            ? apiProj.completionPercentage 
            : (apiProj.completionPercent !== undefined ? apiProj.completionPercent : 0),
        deliveryDate: apiProj.deliveryDate || "",
        totalUnits: apiProj.totalUnits || 0,
        availableUnits: apiProj.availableUnits !== undefined 
            ? apiProj.availableUnits 
            : (apiProj.totalUnits || 0),
        startingPrice: apiProj.startingPrice || 0,
        images: projectImages,
        videoUrl: apiProj.videoUrl || undefined,
        features: Array.isArray(apiProj.features) ? apiProj.features : [],
        units: Array.isArray(apiProj.units) ? apiProj.units : [],
        paymentPlans: typeof apiProj.paymentPlans === 'string' 
            ? apiProj.paymentPlans 
            : (Array.isArray(apiProj.paymentPlans) ? apiProj.paymentPlans.map((p: any) => `${p.label}: ${p.details}`).join('\n') : "لا توجد خطط دفع متوفرة حالياً"),
        developerId: apiProj.developerId || undefined,
        developerName: apiProj.developerName || apiProj.developer?.companyName || "لقمان العقارية",
        approvalStatus: (apiProj.approvalStatus === "pending" || apiProj.approvalStatus === "approved" || apiProj.approvalStatus === "rejected") 
            ? apiProj.approvalStatus 
            : undefined,
        createdAt: apiProj.createdAt || ""
    };
};

//_____Service_____
export const getProjects = async (params?: Record<string, any>): Promise<GetProjectsResponse> => {
    const response = await api.get<any>("/api/v1/projects", { params });
    
    // Map backend array to match frontend schema
    const rawProjects = response.data?.data?.projects || [];
    const mappedProjects = rawProjects.map((p: any) => mapApiProjectToProject(p));

    return {
        ...response.data,
        data: {
            projects: mappedProjects,
            pagination: response.data?.data?.pagination || {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            }
        }
    };
};

export const getProject = async (id: string): Promise<GetProjectResponse> => {
    const response = await api.get<any>(`/api/v1/projects/${id}`);
    const rawProject = response.data?.data?.project || response.data?.data;
    
    return {
        ...response.data,
        data: mapApiProjectToProject(rawProject)
    };
};