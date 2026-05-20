import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  GetBlogPostsParams,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/services/admin/Blogservice";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const blogKeys = {
  all: ["blog"] as const,
  list: (params: GetBlogPostsParams) => ["blog", "list", params] as const,
};

// ─── GET: List ────────────────────────────────────────────────────────────────

export const useGetBlogPosts = (params: GetBlogPostsParams = {}) => {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => getBlogPosts(params),
  });
};

// ─── POST: Create ─────────────────────────────────────────────────────────────

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, CreateBlogPayload>({
    mutationFn: async (payload) => {
      await createBlogPost(payload);
    },
    onSuccess: () => {
      toast.success("تم إضافة المقال بنجاح");
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "حدث خطأ أثناء إضافة المقال";
      toast.error(message);
    },
  });
};

// ─── PUT: Update ──────────────────────────────────────────────────────────────

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    { id: string; payload: UpdateBlogPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      await updateBlogPost(id, payload);
    },
    onSuccess: () => {
      toast.success("تم تحديث المقال بنجاح");
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "حدث خطأ أثناء تحديث المقال";
      toast.error(message);
    },
  });
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (id) => {
      await deleteBlogPost(id);
    },
    onSuccess: () => {
      toast.success("تم حذف المقال بنجاح");
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "حدث خطأ أثناء حذف المقال";
      toast.error(message);
    },
  });
};
