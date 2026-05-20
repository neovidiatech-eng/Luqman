import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  changePassword,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "@/services/admin/Profileservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const profileKeys = {
  all: ["profile"] as const,
  profile: ["profile", "admin"] as const,
};

// ─── Get Profile ──────────────────────────────────────────────────────────────

export const useGetProfile = () => {
  return useQuery({
    queryKey: profileKeys.profile,
    queryFn: getProfile,
  });
};

// ─── Update Profile ───────────────────────────────────────────────────────────

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    UpdateProfilePayload
  >({
    mutationFn: async (payload) => {
      await updateProfile(payload);
    },
    onSuccess: () => {
      toast.success("تم تحديث الملف الشخصي بنجاح");
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Change Password ──────────────────────────────────────────────────────────

export const useChangePassword = () => {
  return useMutation<
    void,
    AxiosError<{ message: string }>,
    ChangePasswordPayload
  >({
    mutationFn: async (payload) => {
      await changePassword(payload);
    },
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
