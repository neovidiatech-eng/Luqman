import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  isPublished?: boolean;
}

export interface GetBlogPostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: BlogPost[];
    pagination: BlogPagination;
  };
}

export interface BlogPostResponse {
  success: boolean;
  message: string;
  data: BlogPost;
}

export interface BlogActionResponse {
  success: boolean;
  message: string;
  data: object;
}

// form-data لأن الـ POST بيستخدم  CreateBlogPayload
export interface CreateBlogPayload {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[]; // ✅ array دايمًا — الـ service هو اللي يتعامل مع FormData
  isPublished: boolean;
  coverImage?: File | null;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * payload → FormData
 * - tags: بنبعت كل tag كـ fd.append("tags[]", tag) — الأسلوب الأضمن مع الـ backends
 * - isPublished: boolean → "true"/"false" string
 * - coverImage: File أو null
 */
function toFormData(payload: CreateBlogPayload | UpdateBlogPayload): FormData {
  const fd = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "tags" && Array.isArray(value)) {
      // ✅ كل tag كـ entry منفصلة → tags[] = "new", tags[] = "invest"
      value.forEach((tag: string) => fd.append("tags[]", tag));
      return;
    }

    if (key === "isPublished") {
      fd.append("isPublished", value ? "true" : "false");
      return;
    }

    if (key === "coverImage" && value instanceof File) {
      fd.append("coverImage", value);
      return;
    }

    fd.append(key, String(value));
  });

  return fd;
}

// ─── Service ──────────────────────────────────────────────────────────────────

/** GET /api/v1/admin/blog */
export const getBlogPosts = async (
  params: GetBlogPostsParams = {},
): Promise<GetBlogPostsResponse> => {
  const { page = 1, limit = 10, search, isPublished } = params;
  const response = await api.get<GetBlogPostsResponse>("/api/v1/admin/blog", {
    params: {
      page,
      limit,
      ...(search !== undefined && search !== "" && { search }),
      ...(isPublished !== undefined && { isPublished }),
    },
  });
  return response.data;
};

/** POST /api/v1/admin/blog */
export const createBlogPost = async (
  payload: CreateBlogPayload,
): Promise<BlogPostResponse> => {
  const response = await api.post<BlogPostResponse>(
    "/api/v1/admin/blog",
    toFormData(payload),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

/** PUT /api/v1/admin/blog/:id */
export const updateBlogPost = async (
  id: string,
  payload: UpdateBlogPayload,
): Promise<BlogPostResponse> => {
  const response = await api.put<BlogPostResponse>(
    `/api/v1/admin/blog/${id}`,
    toFormData(payload),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

/** DELETE /api/v1/admin/blog/:id */
export const deleteBlogPost = async (
  id: string,
): Promise<BlogActionResponse> => {
  const response = await api.delete<BlogActionResponse>(
    `/api/v1/admin/blog/${id}`,
  );
  return response.data;
};
