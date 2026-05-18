import api from "@/lib/axios";
import { BlogPost } from "@/lib/types";

//___Types___
export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface GetBlogsParams {
    page?: number;
    limit?: number;
    search?: string;

}

export interface GetBlogsResponse {
    success: boolean;
    message: string;
    data: {
        posts: BlogPost[];
        pagination: Pagination;
    }
}

//___Service__

export const getBlogs = async (
    params: GetBlogsParams = {},
): Promise<GetBlogsResponse> => {

    const {
        page = 1,
        limit = 10,
        search
    } = params;

    try {
        const response = await api.get<GetBlogsResponse>("/api/v1/blog", {
            params: {
                page,
                limit,
                search
            }
        })
        return response.data;

    } catch (error) {
        console.error("Error fetching blogs", error);
        throw error;
    }
}

export interface GetBlogResponse {
    success: boolean;
    message: string;
    data: BlogPost;
}

export const getBlogBySlug = async (slug: string): Promise<GetBlogResponse> => {
    try {
        const response = await api.get<GetBlogResponse>(`/api/v1/blog/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog with slug ${slug}`, error);
        throw error;
    }
}