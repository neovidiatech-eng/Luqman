import { useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogBySlug, GetBlogsParams } from "@/services/public/BlogService";

export const useBlogs = (params?: GetBlogsParams) => {
    return useQuery({
        queryKey: ["blogs", params],
        queryFn: () => getBlogs(params),
    });
};

export const useBlog = (slug: string) => {
    return useQuery({
        queryKey: ["blog", slug],
        queryFn: () => getBlogBySlug(slug),
        enabled: !!slug, // Only run the query if a slug is provided
    });
};